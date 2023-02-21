import Sidebar from "components/admin/Sidebar";
import DeletePopup from "components/admin/DeletePopup";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ data }) => {
  const [products, setProducts] = useState(data);
  const [deleting, setDeleting] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => setProducts(data), [data]);

  const handleDelete = async () => {
    if (currentId) {
      setLoading(true);

      const { data } = await axios.delete(
        `https://amazona-3yua.onrender.com/products/${currentId}/delete`
      );

      setProducts(data);
      toast.success("products deleted successfully");
      setLoading(false);
      setDeleting(false);
    }
  };

  if (!products.length) return "Loading...";

  return (
    <>
      <Head>
        <title>Amazona - Dashboard</title>
      </Head>
      {deleting && (
        <DeletePopup
          handleDelete={handleDelete}
          hidePopup={() => setDeleting(false)}
          text={loading ? "Deleting..." : "Delete"}
          disabled={loading}
        />
      )}
      <div className="flex">
        <Sidebar />
        <div className="grid grid-cols-1 mt-4 px-4 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <div className="card h-fit" key={product._id}>
              <Link href={`/admin/product/${product._id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className="rounded shadow"
                  width={500}
                  height={500}
                />
              </Link>
              <div className="flex flex-col items-center justify-center p-5">
                <Link href={`/admin/product/${product._id}`}>
                  <span className="text-lg">{product.name}</span>
                </Link>
                <p className="mb-2">{product.brand}</p>
                <p className="mb-4">${product.price}</p>
                <div className="flex justify-between w-full">
                  {" "}
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => {
                      router.push(`/admin/product/${product._id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 px-3 rounded text-white hover:bg-red-700"
                    type="button"
                    onClick={() => {
                      setDeleting(true);
                      setCurrentId(product._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    "https://amazona-3yua.onrender.com/products"
  );
  return {
    props: {
      data,
    },
  };
};

Dashboard.auth = true;
export default Dashboard;
