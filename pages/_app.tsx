import Sidebar from "@/components/Sidebar/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Login from "./auth/login";
import { AuthProvider, authContext } from "@/context/AuthContext";
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
        <ToastContainer />
      </Provider>
    </AuthProvider>
  );
}
