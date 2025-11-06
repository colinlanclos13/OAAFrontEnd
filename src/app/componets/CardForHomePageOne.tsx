"use client";

import React, { useEffect, useRef, useState } from "react";

//This is the left card for program purchase page
function CardForHomePageOne() {
  const ref = useRef();
  const visibleClassName = "show2 card text-bg-dark mb-3 "; // Change this to your desired class name
  const hiddenClassName = "hidden2"; // Change this to your desired class name

  // Determine the current class based on visibility
  //const currentClassName = inView ? visibleClassName : hiddenClassName;

  return (
    <div
      className={visibleClassName}
      style={{ width: "40rem" }}
    >
      <img
        src="/imgs/croppedphotos/swingingpipe.jpg"
        className="img-in-card img-fluid"
        alt="..."
      />
      <div className="card-img-overlay">
        <h5 className="card-title fs-3">Purchase Our Programs</h5>
        <p className="card-text fs-5">Get Access to our Program</p>
        <a href="/purchase" className="btn btn-info text-white">
          Buy Program
        </a>
      </div>
    </div>
  );
}
export default CardForHomePageOne;
