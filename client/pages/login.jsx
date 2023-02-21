import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "redux/slices/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirect } = router.query;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ firstName, lastName, email, password }) => {
    if (isLogin) {
      try {
        const { data } = await axios.post(
          "https://amazona-3yua.onrender.com/auth/login",
          {
            email,
            password,
          }
        );

        dispatch(setUser({ user: data.user, token: data.token }));

        router.push(redirect || "/");
      } catch (error) {
        console.error({ error: error.message });
      }
    } else {
      try {
        const { data } = await axios.post(
          "https://amazona-3yua.onrender.com/auth/register",
          {
            firstName,
            lastName,
            email,
            password,
            isAdmin: false,
          }
        );

        dispatch(setUser({ user: data.user, token: data.token }));

        router.push(redirect || "/");
      } catch (error) {
        console.error({ error: error.message });
      }
    }
  };

  return (
    <form
      className="mx-auto max-w-screen-md"
      onSubmit={handleSubmit(submitHandler)}
    >
      <>
        <h1 className="title">{isLogin ? "Login" : "Sign Up"}</h1>
        {!isLogin && (
          <>
            <div className="mb-4">
              <label htmlFor="email">First Name</label>
              <input
                type="text"
                className="w-full"
                id="firstName"
                autoFocus
                {...register("firstName", {
                  required: "Please enter your first name",
                })}
              />
              {errors.firstName && (
                <div className="text-red-500">{errors.firstName.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email">Last Name</label>
              <input
                type="text"
                className="w-full"
                id="lastName"
                autoFocus
                {...register("lastName", {
                  required: "Please enter your last name",
                })}
              />
              {errors.lastName && (
                <div className="text-red-500">{errors.lastName.message}</div>
              )}
            </div>
          </>
        )}
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="w-full"
            id="email"
            autoFocus
            {...register("email", { required: "Please enter email" })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full"
            id="password"
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 8,
                message: "password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="primary-button w-full font-bold transition"
          >
            {isLogin ? "Login" : "Sign up"}
          </button>
        </div>
        <div
          className="mb-4 cursor-pointer transition hover:underline text-blue-600 "
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </div>
      </>
    </form>
  );
};

export default Login;
