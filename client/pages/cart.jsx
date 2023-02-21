import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FiXCircle } from "react-icons/fi";
import { deleteItemFromCart, updateCartItems } from "redux/slices/cartSlice";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  const { cartItems, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  const [cart, setCart] = useState({
    cartItems: [],
    totalItems: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    setCart({
      cartItems,
      totalItems,
      totalPrice,
    });
  }, [cartItems, totalItems, totalPrice]);

  return (
    <>
      <h1 className="title">Shopping Cart</h1>
      {cart.cartItems?.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems?.map((item) => (
                  <tr key={item._id} className=" border-b">
                    <td>
                      <Link
                        href={`/product/${item._id}`}
                        className="flex items-center gap-5 py-2"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="rounded-md h-20 w-20 m"
                          width={50}
                          height={50}
                        />
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            updateCartItems({
                              _id: item._id,
                              qty: +e.target.value,
                            })
                          );
                          toast.update("Item Quantity updated");
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => {
                          dispatch(deleteItemFromCart(item));
                          toast.warning("Item deleted successfully");
                        }}
                      >
                        <FiXCircle className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cart.totalItems}) : ${cart.totalPrice}
                </div>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (!user) {
                      router.push("login?redirect=/shipping");
                    } else {
                      router.push("/shipping");
                    }
                  }}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
