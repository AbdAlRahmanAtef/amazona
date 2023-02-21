import CheckoutWizard from "@/components/CheckoutWizard";
import { SHIPPING_ADDRESS_LOCAL_STORAGE_KEY } from "constants";
import { PAYMENT_METHOD_LOCAL_STORAGE_KEY } from "constants";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setPaymentMethod } from "redux/slices/cartSlice";

const Payment = () => {
  const methods = ["PayPal", "Stripe", "CashOnDelivery"];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }

    dispatch(setPaymentMethod(selectedPaymentMethod));

    router.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress]);

  return (
    <>
      <Head>
        <title>Amazona - Payment Method</title>
      </Head>
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md">
        <h1 className="title">Payment Method</h1>
        {methods.map((method) => (
          <div key={method} className="mb-4">
            <input
              id={method}
              type="radio"
              name="paymentMethod"
              className="p-2 cursor-pointer outline-none focus:ring-0"
              checked={selectedPaymentMethod === method}
              onChange={() => {
                setSelectedPaymentMethod(method);
              }}
            />
            <label className="p-2 cursor-pointer" htmlFor={method}>
              {method}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <Link className="default-button" href="/shipping">
            Back
          </Link>
          <button className="primary-button" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </form>
    </>
  );
};

Payment.auth = true;
export default Payment;
