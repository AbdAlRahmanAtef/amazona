import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { logOut } from "redux/slices/userSlice";
import ThemeButton from "./ThemeButton";
import { useRouter } from "next/router";
import {
  setBrand,
  setCategory,
  setPage,
  setPrice,
  setQuery,
  setRating,
} from "redux/slices/searchSlice";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { query } = useSelector((state) => state.search);

  useEffect(() => {
    setItemsCount(totalItems);
  }, [totalItems]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <div className="relative flex h-[60px] justify-between shadow-md items-center px-4 gap-5">
      <form
        onSubmit={handleSearch}
        className={`flex items-center duration-300 absolute top-[62px] z-40 w-fit justify-center left-[50%] max-w-[90%] translate-x-[-50%] ${
          !isSearchActive && "top-[-10px] z-[-1] hidden"
        }`}
      >
        <input
          value={query}
          onChange={(e) => {
            dispatch(setQuery(e.target.value));
            dispatch(setCategory(""));
            dispatch(setBrand(""));
            dispatch(setPrice(""));
            dispatch(setRating(""));
            dispatch(setPage(1));
          }}
          type="text"
          className=" rounded rounded-tr-none rounded-br-none h-[50px] px-4 text-lg w-[350px] max-w-[90%] focus:ring-0"
          placeholder="Search products"
        />
        <button
          className="rounded rounded-tl-none rounded-bl-none h-[50px] bg-amber-300 px-3 text-sm"
          type="submit"
          id="button-addon2"
        >
          <BiSearch size={20} />
        </button>
      </form>
      <div className="flex gap-3 items-center">
        <Link href="/" className="text-xl font-bold">
          Amazona
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <button
          className="flex items-center justify-center rounded-full text-blue-600 hover:bg-[#eee] h-[35px] w-[35px]"
          onClick={() => setIsSearchActive((prev) => !prev)}
          id="button-addon2"
        >
          {isSearchActive ? <GiCancel size={20} /> : <BiSearch size={20} />}
        </button>
        <Link href="/cart" className="flex items-center gap-1">
          <HiOutlineShoppingBag size={25} />
          <span className="text-xs">({itemsCount})</span>
        </Link>
        {mounted && <ThemeButton />}
        {user ? (
          <div className="relative">
            <p
              className="cursor-pointer flex items-center gap-1 min-w-fit"
              onClick={() => setIsMenuActive((prev) => !prev)}
            >
              {user.name}
              {isMenuActive ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </p>
            {isMenuActive && (
              <div className="absolute b-0 border-t bg-white min-w-full py-2 rounded-md z-50">
                {user.isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className=" w-full m-0 px-4 py-2 block text-black cursor-pointer hover:bg-[#eee] hover:text-black"
                    onClick={() => setIsMenuActive(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/orders-history"
                  className=" w-full m-0 px-4 py-2 block text-black cursor-pointer hover:bg-[#eee] hover:text-black"
                  onClick={() => setIsMenuActive(false)}
                >
                  Orders History
                </Link>
                <p
                  className="px-4 py-2 cursor-pointer text-black hover:bg-[#eee]"
                  onClick={() => {
                    dispatch(logOut());
                    setIsMenuActive(false);
                  }}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="px-2 text-lg">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
