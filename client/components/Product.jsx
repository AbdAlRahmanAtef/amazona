import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { addItemToCart } from "redux/slices/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <Link href={`/product/${product._id}`}>
        <Image
          src={product.image}
          alt={product.name}
          className="rounded shadow"
          width={800}
          height={800}
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product._id}`}>
          <span className="text-lg">{product.name}</span>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="mb-3">${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            dispatch(addItemToCart(product));
            toast.success("Item added successfully");
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
