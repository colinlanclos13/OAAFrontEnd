import React from "react";
import "./styles.scss";
import Carsousel from "./componets/Carsousel";
import Navbar from "./componets/Navbar";
import Bottomtext from "./componets/Bottomtext";
import OurVision from "./componets/AboutUs";
import CardForHomePageOne from "./componets/CardForHomePageOne";
import CardForHomePageTwo from "./componets/CardForHomePageTwo";
import Checkout from "./componets/PayPal";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Carsousel />
      <OurVision />
      <div className="card-containter">
        <CardForHomePageOne />
        <CardForHomePageTwo />
      </div>
      <Bottomtext />
    </>
  );
}
