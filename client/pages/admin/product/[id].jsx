import axios from "axios";
import Head from "next/head";
import React, { useState } from "react";

import Form from "components/admin/Form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ProductPage = ({ product }) => {
  const [formData, setFormData] = useState({ ...product });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    if (
      formData.name !== "" &&
      formData.image !== "" &&
      formData.banner !== "" &&
      formData.price !== 0 &&
      formData.brand !== "" &&
      formData.category !== ""
    ) {
      setLoading(true);

      const { data } = await axios.patch(
        "http://localhost:5000/products/update",
        formData
      );
      setLoading(false);
      toast.success("Product added successfully");
      router.push("/admin/dashboard");
    }
  };

  return (
    <>
      <Head>
        <title>Amazona - Edit Product</title>
      </Head>
      <div className="container p-4 max-w-screen-md m-auto">
        <h1 className="title">Edit Product</h1>
        <Form
          type="update"
          loading={loading}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params: { id } }) => {
  const { data } = await axios.get(`http://localhost:5000/products/${id}`);

  return {
    props: {
      product: data,
    },
  };
};

ProductPage.auth = true;
export default ProductPage;
