import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
const Navbar = ({ logout }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  function handleRemoveCookie() {
    removeCookie("jwt");
    localStorage.removeItem("user");
    logout();
  }

  const handelLogout = () => {
    logout();
    handleRemoveCookie();
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            Bike🚵Reservation
          </Link>
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
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/about"}>
                  About
                </Link>
              </li>
            </ul>
          </div>

          {user && user.userType === "admin" ? (
            <>
              <Link to={"bike/add"} className="btn btn-light">
                Add Bike
              </Link>
              <Link to={"user/alluser"} className="btn btn-success text-light">
                All Users
              </Link>
              <Link to={"bike/all-bikes"} className="btn btn-info text-light">
                All Bikes
              </Link>
            </>
          ) : (
            ""
          )}

          <Link to={"/bike/reservation"} className="btn btn-warning">
            My Booking
          </Link>

          <button
            onClick={handelLogout}
            className="btn btn-outline-light ms-4 "
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
