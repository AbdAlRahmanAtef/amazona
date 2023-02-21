import axios from "axios";
import Product from "components/Product";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = ({ products }) => {
  if (!products.length) return "Loading...";
  const featuredProducts = products.filter((product) => product.isFeatured);
  console.log({ featuredProducts });

  return (
    <>
      {featuredProducts && (
        <div className="flex mx-auto w-full justify-center items-center">
          <Carousel showThumbs={false} stopOnHover autoPlay className="mb-7">
            {featuredProducts.map((product) => (
              <div key={product._id}>
                <Link href={`/product/${product._id}`} passHref>
                  <img
                    src={product.banner}
                    alt={product.name}
                    className="rounded-md"
                  />
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:5000/products");
  return {
    props: {
      products: data,
    },
  };
};

export default Home;
