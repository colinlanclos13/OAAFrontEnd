"useClient";

import { useState, useEffect } from "react";
import { alreadyPurchased, purchaseProduct } from "../services/Queries";
import { redirect } from "next/dist/server/api-utils";
import { replace } from "formik";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { json } from "stream/consumers";
import Checkout from "../componets/PayPal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/esm/Spinner";
import React from "react";
import PDFViewer from "./pdf";

//useless sorry
function Product(props: any) {
  const googleDriveLink = "https://pdflink.to/38a064c4/";
  var purchased = false;
  const { push } = useRouter();
  let jsonString: any;

  if (typeof window !== "undefined") {
    jsonString = sessionStorage.getItem("id");
  }

  if (jsonString === null) {
    toast("Please Login", {
      toastId: "oneTime1",
      position: "top-center",
      autoClose: 5000,
    });
    setTimeout(() => {
      console.log("Hello, World!");
    }, 2000);
    push("/login");
  }
    console.log(jsonString);
    const myObject = JSON.parse(jsonString);
    const { isError, isSuccess, isLoading, data, error } = useQuery({
      queryKey: ["purchased"],
      queryFn: () => alreadyPurchased(myObject.id, myObject.jwt),
      enabled: !!jsonString
    });

    if (isLoading) {
    }

    if (isError) {
      toast.error("Something went wrong. Please Contact Support");
    }
    if (isSuccess) {
      toast.success("Succesfull Load", {
        toastId: "oneTime",
        position: "top-center",
        autoClose: 5000,
      });
      if (data === true) {
        purchased = true;
      }
    }
  

  if (!purchased) {
    return (
      <>
        <div className="successfulPurchase text-center">
          Program will show after successful purchase
        </div>
        <div className="contactUs text-center">
          If Program does not show please contact us
        </div>
        <iframe
          src={googleDriveLink}
          title="Embedded PDF"
          width="100%"
          height="600"
        />

        <div className="row justify-content-center">
          <Checkout />
        </div>
      </>
    );
  } else {
    return (
      <>
        <iframe
          src={googleDriveLink}
          title="Embedded PDF"
          width="100%"
          height="600"
        />
      </>
    );
  }
}

export default Product;
