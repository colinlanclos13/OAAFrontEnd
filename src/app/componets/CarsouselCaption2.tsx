"use client";

import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/esm/Carousel";
//import { useInView } from "react-intersection-observer";

//for fade in text
function CarsouselCarouselCaption2() {
  const ref = useRef();
 // const { ref: inViewRef, inView } = useInView();

  // Define your custom class names
  const visibleClassName = "show1 text-end"; // Change this to your desired class name
  const hiddenClassName = "hidden1"; // Change this to your desired class name

  // Determine the current class based on visibility
  //const currentClassName = inView ? visibleClassName : hiddenClassName;

  return (
    <Carousel.Caption  className={visibleClassName}>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  );
}

export default CarsouselCarouselCaption2;
