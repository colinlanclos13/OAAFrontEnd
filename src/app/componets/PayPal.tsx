"use client";

import React, { useState } from "react";
/*import "./Checkout.css";*/
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import PayPalButton from "./PayPalButton";
import "../styles.scss";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Checkout(props: any) {
  const priceOfProduct = sessionStorage.getItem("cost");
  const product = {
    description: "1st Program For Emerge Sports",
    currncyCode: "USD",
    price: priceOfProduct,
    programid: props.programid,
  };
  console.log("fucker fuck");
  console.log(props.programid);

  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId:
            "AXGxkr9LiLed7P1uv4jROvAc-bFUBVdm-k5HFkt15jnFkkqOBrlPgwFDeiK63GoG_j0aSu7KFdJ_AZJZ",
          disableFunding: "paylater",
        }}
      >
        <div className="paypal-button-container">
          <PayPalButton product={product} />
        </div>
      </PayPalScriptProvider>
    </>
  );
}

export default Checkout;
