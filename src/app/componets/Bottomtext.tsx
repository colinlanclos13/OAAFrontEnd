import React from "react";


//bootom text to all pages
function Bottomtext() {
  return (
    <div className="bottom_PageContainer bg-secondary text-white pt-4">
      <div className="item item-1">
        <p>
          <b>EMegere Player Development</b>
        </p>
        <img
          src="/imgs/EMlogoCopy.png"
          style={{ width: "150px", height: "auto" }}
          className="img-fluid"
          alt="..."
        />
      </div>
      <div className="item item-2 ml-1">
        Contact Us <br />
        <p>
          Thane Camron Lanclos
          <br /> (777)777-7777
        </p>
        <p>
          Colin James Lanclos
          <br />
          (777)777-7777
        </p>
        <p>
          ?Ronnie McBride? <br />
          (777)777-7777
        </p>
      </div>
    </div>
  );
}

export default Bottomtext;
