import Product from "components/Product";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiCancel } from "react-icons/gi";
import {
  setBrand,
  setCategory,
  setPage,
  setPrice,
  setQuery,
  setRating,
  setSortMethod,
} from "redux/slices/searchSlice";
import Head from "next/head";

const Search = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const { query, category, brand, price, rating, page, sortMethod } =
    useSelector((state) => state.search);
  const ratings = [1, 2, 3, 4, 5];
  const [loading, setLoading] = useState(false);

  const prices = [
    {
      name: "All",
      value: "all",
    },
    {
      name: "$1 to $50",
      value: "1-50",
    },
    {
      name: "$51 to $200",
      value: "51-200",
    },
    {
      name: "$201 to $1000",
      value: "201-1000",
    },
  ];

  const getCategories = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/categories`
    );

    setCategories(data);
  };

  const getProducts = async () => {
    setLoading(true);

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/search?query=${query}&category=${category}&brand=${brand}&price=${price}&rating=${rating}&page=${page}&sort=${sortMethod}`
    );

    setProducts(data.products);
    setPagesCount(data.numberOfPages);
    setProductsCount(data.totalProduct);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [query, category, brand, price, rating, page, sortMethod]);

  return (
    <>
      <Head>
        <title>Search - {query}</title>
      </Head>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <div className="my-3">
            <h2>Categories</h2>
            <select
              className="w-full"
              onChange={(e) => dispatch(setCategory(e.target.value))}
              value={category || "all"}
            >
              <option value="all">All</option>
              {categories &&
                categories?.categories?.map((category, idx) => (
                  <option key={idx} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <h2>Brands</h2>
            <select
              className="w-full"
              onChange={(e) => dispatch(setBrand(e.target.value))}
            >
              <option value="all">All</option>
              {categories &&
                categories?.brands?.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <h2>Prices</h2>
            <select
              className="w-full"
              onChange={(e) => dispatch(setPrice(e.target.value))}
              value={price || "all"}
            >
              {prices &&
                prices.map((price) => (
                  <option key={price.value} value={price.value}>
                    {price.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <h2>Ratings</h2>
            <select
              className="w-full"
              onChange={(e) => dispatch(setRating(e.target.value))}
              value={rating || "all"}
            >
              <option value="all">All</option>
              {ratings &&
                ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} star{rating > 1 && "s"} & up
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="mb-2 flex items-center justify-between border-b-2 pb-2">
            <div className="flex items-center">
              {products?.length === 0 ? "No" : productsCount} Results
              {query !== "" && query !== "" && " : " + query}
              {category && category !== "all" && " : " + category}
              {brand && brand !== "all" && " : " + brand}
              {price && price !== "all" && " : Price " + price}
              {rating && rating !== "all" && " : Rating " + rating + " & up"}
              &nbsp;
              {(query !== "" && query !== "") ||
              category !== "" ||
              brand !== "" ||
              rating !== "" ||
              price !== "" ? (
                <button
                  onClick={() => {
                    router.push("/search");
                    dispatch(setQuery(""));
                    dispatch(setCategory(""));
                    dispatch(setBrand(""));
                    dispatch(setPrice(""));
                    dispatch(setRating(""));
                    dispatch(setPage(1));
                  }}
                >
                  <GiCancel className="h-5 w-5" />
                </button>
              ) : null}
            </div>
            {loading && (
              <div class="bg-indigo-500 flex text-[#dbd1d1] font-bold px-4 py-2 rounded">
                <svg
                  fill="#dbd1d1"
                  viewBox="0 0 24 24"
                  stroke="#dbd1d1"
                  class="animate-spin h-5 w-5 mr-3"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path>
                  </g>
                </svg>
                Loading...
              </div>
            )}
            <div>
              Sort by{" "}
              <select onChange={(e) => dispatch(setSortMethod(e.target.value))}>
                <option value="featured">Featured</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="topRated">Customer Reviews</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {products &&
                products?.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
            <ul className="flex">
              {products?.length > 0 &&
                [...Array(pagesCount).keys()].map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      className={`default-button m-2 ${
                        page == pageNumber + 1 ? "font-bold" : ""
                      } `}
                      onClick={() => dispatch(setPage(pageNumber + 1))}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
