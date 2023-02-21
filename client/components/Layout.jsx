import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { route } = useRouter();

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <header>
        <Navbar />
      </header>
      <main
        className={`container m-auto ${
          route.includes("admin") ? "p-0 mt-0" : "p-4 mt-4"
        }`}
      >
        {" "}
        {children}
      </main>
      <footer className="flex justify-center items-center h-10 shadow-inner">
        Copyright &nbsp; <AiOutlineCopyrightCircle />
        &nbsp;
        {new Date().getFullYear()} Amazona
      </footer>
    </div>
  );
};

export default Layout;
