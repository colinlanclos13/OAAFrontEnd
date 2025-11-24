import React from "react";


//bootom text to all pages
function Bottomtext() {
  return (
    <div className="bottom_PageContainer bg-dark text-white pt-4">
      <div className="item item-1">
        <img
          src="/imgs/OAA_Logos/red_word_logo.PNG"
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
          <br /> Email Address
        </p>
      </div>
    </div>
  );
}

export default Bottomtext;
