import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, useTheme } from "next-themes";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { store } from "../redux/store";

import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";
import Layout from "components/Layout";
import Auth from "components/Auth";
import axios from "axios";

const App = ({ Component, pageProps }) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Layout>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </PayPalScriptProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
