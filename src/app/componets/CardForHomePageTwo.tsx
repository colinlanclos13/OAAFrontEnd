"use client";

import React, { useEffect, useRef, useState } from "react";


//card to link to the about us page
function CardForHomePageTwo() {
  const ref = useRef();
  const visibleClassName = "show2 card text-bg-dark mb-3 "; // Change this to your desired class name
  const hiddenClassName = "hidden2"; // Change this to your desired class name

  // Determine the current class based on visibility
  //const currentClassName = inView ? visibleClassName : hiddenClassName;

  return (
    <div
      className={visibleClassName}
      style={{ width: "39rem" }}
    >
      <img
        src="/imgs/croppedphotos/hiprotation.jpg"
        className="img-in-card img-fluid"
        alt="..."
      />
      <div className="card-img-overlay">
        <h5 className="card-title fs-2 ">About Us</h5>
        <p className="card-text fs-5">
          Information about Our Team and Our Vision
        </p>
        <a href="/aboutus" className="btn btn-info text-white">
          About Us
        </a>
      </div>
    </div>
  );
}
export default CardForHomePageTwo;
