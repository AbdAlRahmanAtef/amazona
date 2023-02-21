import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";
import Head from "next/head";

const OrderHistory = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const { _id } = useSelector((state) => state.user.user);

  const getOrderHistory = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/orders/history/${_id}`
    );
    setOrders(data);
  };

  useEffect(() => {
    setLoading(true);
    getOrderHistory();
    setLoading(false);
  }, []);
  return (
    <>
      <Head>
        <title>Order History</title>
      </Head>
      <h1 className="title">Order History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">ID</th>
                <th className="p-5 text-left">DATE</th>
                <th className="p-5 text-left">TOTAL</th>
                <th className="p-5 text-left">PAID</th>
                <th className="p-5 text-left">DELIVERED</th>
                <th className="p-5 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className=" p-5 ">{order._id.substring(20, 24)}</td>
                  <td className=" p-5 ">{order.createdAt.substring(0, 10)}</td>
                  <td className=" p-5 ">${order.totalPrice}</td>
                  <td className=" p-5 ">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : "not paid"}
                  </td>
                  <td className=" p-5 ">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : "not delivered"}
                  </td>
                  <td className=" p-5 ">
                    <Link href={`/order/${order._id}`} passHref>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

OrderHistory.auth = true;

export default OrderHistory;
