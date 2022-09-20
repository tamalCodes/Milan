import React from "react";
import "../styles/Navbar.css";
import solidarity from "../assets/pictures/solidarity.png";
import { useNavigate, NavLink } from "react-router-dom";
import ProfilePicture from "../assets/pictures/ProfilePicture.png";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (Cookies.get("token")) {
      navigate("/user/profile");
    }

    if (Cookies.get("club")) {
      navigate("/clubs/profile");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          {/* //* navbar brand */}

          <img
            src={
              solidarity ||
              "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png"
            }
            onClick={() => window.location.replace("/")}
            alt="Milan-logo"
            className="nav_bramhin_img"
          />

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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item home">
                <NavLink to="/">Home</NavLink>
              </li>

              <li className="nav-item home">
                <NavLink to="/display/clubs">Clubs</NavLink>
              </li>

              <li className="nav-item home">
                <NavLink to="/display/events">Events</NavLink>
              </li>

              <li className="nav-item home">
                <NavLink to="/about-us">About Us</NavLink>
              </li>

              <li className="nav-item home">
                <NavLink to="/contact">Contact</NavLink>
              </li>

              {/* Auth0 will be implemented later on*/}
              {/* The basic JWT Auths will be removed to reduce hassle */}

              {(Cookies.get("token") || Cookies.get("club")) && (
                <img
                  onClick={handleNavigate}
                  src={ProfilePicture}
                  alt="lol"
                  className="nav_user_img"
                />
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
