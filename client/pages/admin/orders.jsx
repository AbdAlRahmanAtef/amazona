import Sidebar from "@/components/admin/Sidebar";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Orders = ({ orders }) => {
  return (
    <>
      <Head>
        <title>Admin - Orders</title>
      </Head>
      <div className="flex mb-5 gap-5">
        <Sidebar activeStep={3} />
        <div className="overflow-x-auto mx-auto px-4">
          <h1 className="title">Admin Orders</h1>
          <div className="overflow-x-auto w-fit">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">ID</th>
                  <th className="p-5 text-left">USER</th>
                  <th className="p-5 text-left">DATE</th>
                  <th className="p-5 text-left">TOTAL</th>
                  <th className="p-5 text-left">PAID</th>
                  <th className="p-5 text-left">DELIVERED</th>
                  <th className="p-5 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-5">{order._id.substring(20, 24)}</td>
                    <td className="p-5">
                      {order.user ? order.user.name : "DELETED USER"}
                    </td>
                    <td className="p-5">{order.createdAt.substring(0, 10)}</td>
                    <td className="p-5">${order.totalPrice}</td>
                    <td className="p-5">
                      {order.isPaid
                        ? `${order.paidAt.substring(0, 10)}`
                        : "not paid"}
                    </td>
                    <td className="p-5">
                      {order.isDelivered
                        ? `${order.deliveredAt.substring(0, 10)}`
                        : "not delivered"}
                    </td>
                    <td className="p-5">
                      <Link href={`/order/${order._id}`} passHref>
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/orders`
  );

  return {
    props: {
      orders: data,
    },
  };
};

Orders.auth = true;
export default Orders;
