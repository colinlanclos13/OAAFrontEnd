"use client";

import exp from "constants";
import React, { useEffect, useRef, useState } from "react";
const { useInView } = require('react-intersection-observer');


//this is about vision.
function OurVision() {
  const ref = useRef();
  const { ref: inViewRef, inView } = useInView();

  // Define your custom class names
  const visibleClassName =
    "show2 container w-75 text-center text-white mt-3 mb-5 rounded p-3"; // Change this to your desired class name
  const hiddenClassName = "hidden2"; // Change this to your desired class name

  // Determine the current class based on visibility
  const currentClassName = inView ? visibleClassName : hiddenClassName;
  return (
    <>
      <div
        ref={inViewRef}
        style={{ backgroundColor: "rgb(120, 173, 207)" }}
        className={currentClassName}
      >
        <h1 className="fw-bold">Our Vision</h1>
        <p className="fs-5">
          A disciplined and hardworking team dedicated to providing top-notch
          training to our clients epitomizes our commitment to excellence. With
          a shared vision and relentless focus, our team operates with
          structured processes, accountability, and a proactive approach.
          Through continuous learning and collaboration, we craft tailored
          training programs that surpass expectations, empowering our clients to
          thrive.
        </p>
      </div>
    </>
  );
}

export default OurVision;
