import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Unauthorized = () => {
  const { query } = useRouter();
  const message = query.message;
  return (
    <>
      <Head>
        <title>Unauthorized Page</title>
      </Head>
      <div className=" mt-10 ml-auto mr-auto text-center">
        <h1 className="title">Access Denied</h1>
        <p className="font-semibold">{message}</p>
        <Link href="/login">Login</Link>
      </div>
    </>
  );
};

export default Unauthorized;
