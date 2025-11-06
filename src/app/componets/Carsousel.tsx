"use client";

import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/esm/Carousel";
import VisibilitySensor from "react-visibility-sensor";
import { boolean } from "yup";
const { useInView } = require('react-intersection-observer');
import CarsouselCarouselCaption from "./CarsouselCarouselCaption";
import CarsouselCarouselCaption2 from "./CarsouselCaption2";
import CarsouselCarouselCaption3 from "./CarsouelCaption3";

//carsousel for home page
function Carsousel() {
  const ref = useRef();
  const { ref: inViewRef, inView } = useInView();

  // Define your custom class names
  const visibleClassName = "show1"; // Change this to your desired class name
  const hiddenClassName = "hidden1"; // Change this to your desired class name

  // Determine the current class based on visibility
  const currentClassName = inView ? visibleClassName : hiddenClassName;

  return (
    <div className="div-car">
      <Carousel className="">
        <Carousel.Item className="">
          <img
            style={{ height: "75vh", objectFit: "cover" }}
            className="d-block w-100 imgs-in-carsousel"
            src="/imgs/croppedphotos/IMG_2333.jpg"
            alt=""
          />
          <CarsouselCarouselCaption />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "75vh", objectFit: "cover" }}
            className="d-block w-100 imgs-in-carsousel"
            src="/imgs/croppedphotos/IMG_2334.jpg"
            alt=""
          />
          <CarsouselCarouselCaption2 />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "75vh", objectFit: "cover" }}
            className="d-block w-100 imgs-in-carsousel"
            src="/imgs/croppedphotos/IMG_2341.jpg"
            alt=""
          />
          <CarsouselCarouselCaption3 />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carsousel;
