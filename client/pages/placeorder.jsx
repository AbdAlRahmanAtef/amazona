import axios from "axios";
import CheckoutWizard from "components/CheckoutWizard";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "redux/slices/cartSlice";

const Placeorder = () => {
  const { cartItems, totalItems, totalPrice, shippingAddress, paymentMethod } =
    useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const shippingPrice = totalPrice > 200 ? 0 : 15;
  const taxPrice = totalPrice * 0.15;
  const finalPrice = totalPrice + taxPrice + shippingPrice;

  const orderItems = cartItems.map((item) => {
    return {
      name: item.name,
      qty: item.qty,
      price: item.price,
      image: item.image,
    };
  });

  const placeOrderHandler = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:5000/orders", {
        userId: user?._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: totalPrice,
        shippingPrice,
        taxPrice,
        totalPrice: finalPrice,
      });

      setIsLoading(false);

      dispatch(clearCart());

      router.push(`/order/${data._id}`);
    } catch (err) {
      setIsLoading(false);

      toast.error(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Amazona - Place Order</title>
      </Head>
      <CheckoutWizard activeStep={3} />
      <h1 className="title">Place Order</h1>
      {cartItems.length === 0 ? (
        <Link href="/">Go shopping</Link>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </div>
              <Link className="block mt-3" href="/shipping">
                Edit
              </Link>
            </div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              <Link className="block mt-3" href="/payment">
                Edit
              </Link>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item._id}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.qty}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.qty * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link className="block mt-3" href="/cart">
                Edit
              </Link>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${totalPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice.toFixed(2)}</div>
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
                    <div>
                      ${(totalPrice + taxPrice + shippingPrice).toFixed(2)}
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={isLoading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {isLoading ? "Loading..." : "Place Order"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Placeorder.auth = true;
export default Placeorder;
