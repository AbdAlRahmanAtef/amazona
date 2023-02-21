import Sidebar from "@/components/admin/Sidebar";
import axios from "axios";
import Form from "components/admin/Form";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    price: 0,
    brand: "",
    rating: 0,
    numReviews: 0,
    description: "",
    countInStock: 1,
    isFeatured: true,
    banner: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name !== "" &&
      formData.image !== "" &&
      formData.price !== 0 &&
      formData.brand !== "" &&
      formData.category !== ""
    ) {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/products",
        formData
      );
      console.log({ data });
      setLoading(false);
      toast.success("Product added successfully");
      router.push("/admin/dashboard");
    }
  };

  return (
    <>
      <Head>
        <title>Admin - Add Product</title>
      </Head>
      <div className="flex">
        <Sidebar activeStep={1} />
        <div className="container p-4 max-w-screen-md m-auto">
          <h1 className="title">Add Product</h1>
          <Form
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            formData={formData}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

AddProduct.auth = true;
export default AddProduct;
