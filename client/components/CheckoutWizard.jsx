import React from "react";

const CheckoutWizard = ({ activeStep = 0 }) => {
  const wizards = [
    "User Login",
    "Shipping Address",
    "Payment Method",
    "Place Order",
  ];

  return (
    <div className="mb-5 flex flex-wrap">
      {wizards.map((step, idx) => (
        <div
          className={`flex-1 border-b-2 text-center ${
            idx <= activeStep
              ? "border-indigo-500 text-indigo-500"
              : "border-gray-400 text-gray-400"
          }`}
          key={step}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default CheckoutWizard;
