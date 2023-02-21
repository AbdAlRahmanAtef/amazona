import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Auth = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  if (!user) {
    router.push("/unauthorized?message=login required");
  } else {
    if (router.route.includes("/admin") && !user.isAdmin) {
      router.push("/unauthorized?message=admin login required");
    } else {
      return children;
    }
  }
};

export default Auth;
