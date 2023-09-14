import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addItemToCart } from "redux/slices/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>Product - {product.name}</title>
      </Head>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="title">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={() => {
                dispatch(addItemToCart(product));
                toast.success("Item added successfully");
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params: { id } }) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`
  );

  return {
    props: {
      product: data,
    },
  };
};

export default Product;
