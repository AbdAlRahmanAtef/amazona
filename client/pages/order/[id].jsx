import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Order = ({ order }) => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const {
    shippingAddress,
    isDelivered,
    isPaid,
    paidAt,
    itemsPrice,
    orderItems,
    paymentMethod,
    shippingPrice,
    taxPrice,
    totalPrice,
    deliveredAt,
  } = order;

  useEffect(() => {
    const loadPaypalScript = async () => {
      paypalDispatch({
        type: "restOptions",
        value: {
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };
    loadPaypalScript();
  }, [paypalDispatch]);

  const createOrder = (data, action) => {
    return action.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, action) => {
    return action.order.capture().then(async (details) => {
      try {
        setLoading(true);
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${order._id}/pay`,
          details
        );

        setLoading(false);
        toast.success("Order is paid successfully");
      } catch (error) {
        toast.err(error.message);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const handleDeliverOrder = async () => {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${order._id}/deliver`
    );

    toast.success("Order delivered successfully");
  };

  if (loading) return "Loading...";

  return (
    <>
      <Head>
        <title>{`Order - ${order._id}`}</title>
      </Head>
      <h1 className="title">{`Order ${order._id}`}</h1>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card  p-5">
            <h2 className="mb-2 text-lg">Shipping Address</h2>
            <div>
              {shippingAddress?.fullName}, {shippingAddress?.address},{" "}
              {shippingAddress?.city}, {shippingAddress?.postalCode},{" "}
              {shippingAddress?.country}
            </div>
            {isDelivered ? (
              <div className="alert-success">Delivered at: {deliveredAt}</div>
            ) : (
              <div className="alert-error">Not delivered</div>
            )}
          </div>

          <div className="card p-5">
            <h2 className="mb-2 text-lg">Payment Method</h2>
            <div>{paymentMethod}</div>
            {isPaid ? (
              <div className="alert-success">Paid at: {paidAt}</div>
            ) : (
              <div className="alert-error">Not paid</div>
            )}
          </div>

          <div className="card overflow-x-auto p-5">
            <h2 className="mb-2 text-lg">Order Items</h2>
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item?._id}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          width={50}
                          height={50}
                        />
                        &nbsp;
                        {item?.name}
                      </Link>
                    </td>
                    <td className=" p-5 text-right">{item?.qty}</td>
                    <td className="p-5 text-right">${item?.price}</td>
                    <td className="p-5 text-right">
                      ${(item?.qty * item?.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="card  p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${itemsPrice.toFixed(2)}</div>
                </div>
              </li>{" "}
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice?.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>${totalPrice.toFixed(2)}</div>
                </div>
              </li>
              {!isPaid && (
                <li>
                  {isPending ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="w-full">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {/* {loadingPay && <div>Loading...</div>} */}
                </li>
              )}
              {user.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {/* {loadingDeliver && <div>Loading...</div>} */}
                  <button
                    className="primary-button w-full"
                    onClick={handleDeliverOrder}
                  >
                    Deliver Order
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params: { id } }) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${id}`
  );

  return {
    props: {
      order: data,
    },
  };
};

export default Order;
