"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";

//nav bar
function Navbar() {
  const { push } = useRouter();
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bg-dark bg-gradient">
        <div className="container-fluid d-flex justify-content-between">
        <a className="navbar-brand d-flex align-items-center" onClick={() => push("/")}>
          <img
            src="/imgs/OAA_Logos/cropped_OAALOGO.PNG"
            className="img-fluid"
            style={{ maxWidth: "125px", maxHeight:'auto'}}
            alt="logo"
          />
        </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={() => push("/")}
                >
                  <h5>Home</h5>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => push("/profile")}
                >
                  <h5> Profile</h5>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => push("/purchase")}
                >
                  <h5>Programs</h5>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => push("/VideoCatalog")}
                >
                  <h5>Video Catalog</h5>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => push("/aboutus")}
                >
                  <h5>About Us </h5>
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li> */}
            </ul>
            <form className="d-flex">
              {sessionStorage.getItem("id") === null ? (
                <>
                  <button
                    type="button"
                    onClick={() => push("/login")}
                    className="btn btn-outline-dark me-2"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => push("/register")}
                  >
                    New Account
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => {
                    push("/"), sessionStorage.clear(), location.reload();
                  }}
                >
                  Log Out
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
