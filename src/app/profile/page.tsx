"use client";
import { toast } from "react-toastify";
import Bottomtext from "../componets/Bottomtext";
import LoginForm from "../componets/LoginForm";
import Navbar from "../componets/Navbar";
import "../styles.scss";
import { useRouter } from "next/navigation";
import ProfileComp from "../componets/ProfileComp";

export default function Profile() {
  const { push } = useRouter();

  const jsonString = sessionStorage.getItem("id");

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
  return (
    <>
      <Navbar />
      <ProfileComp />
      <Bottomtext />
    </>
  );
}
