"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import "../styles.scss";
import { any } from "zod";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { purchaseProduct } from "../services/Queries";
import { useRouter } from "next/navigation";
import { string } from "yup";
import { AnyARecord } from "dns";
import { toast } from "react-toastify";
type purchaseData = {
  id: any;
  orderId: string;
  jwt: any;
  programid: any;
  cost: any;
};

const PayPalButton = (props: any) => {
  const { product } = props;
  const { push } = useRouter();

  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (param: purchaseData) => {
      return purchaseProduct(param);
    },
    onSuccess: () => {
      toast.success("Succesfull Purchase", {
        toastId: "oneTimeSuccesfull Purchase",
        position: "top-center",
        autoClose: 5000,
      });
      setPaid(true);
    },
    onError: () => {
      toast.error(
        "Payment Process Error has accured but payment has gone through. Please contact support",
        {
          toastId: "oneTimePaymentError",
          position: "top-center",
          autoClose: 5000,
        }
      );
    },
  });

  function handleApprove(orderID: string) {
    //fufill order to backend server and make approved or some shit
    const jsonString = sessionStorage.getItem("id");
    if (jsonString === null) {
      push("/login");
      return;
    }

    // Parse the JSON string into an object
    const myObject = JSON.parse(jsonString);
    console.log(props.programid);

    console.log(myObject);

    const costSession = sessionStorage.getItem("cost");
    const programidSession = sessionStorage.getItem("productId");

    const purchaseData = {
      id: myObject.id,
      orderId: orderID,
      jwt: myObject.jwt,
      programid: programidSession,
      cost: costSession,
    };

    mutation.mutate(purchaseData);

    //make paid for state to true using hooks (use state)
  }
  if (error) {
    alert(error);
  }

  return (
    <div className="container">
      <PayPalButtons
        onClick={(data, actions) => {
          if (paid) {
            setError("Already purchase this Course");
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: "USD",
                  value: product.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();

          console.log(order);

          handleApprove(data.orderID);
        }}
        onError={(err: any) => {
          setError(err);
          console.error("Paypal Payment Error", err);
        }}
      />
    </div>
  );
};

export default PayPalButton;
