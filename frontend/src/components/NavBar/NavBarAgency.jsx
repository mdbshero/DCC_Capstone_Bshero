import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const NavbarAgency = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="navbar-brand">
          <b onClick={() => navigate("/")} >fĕch</b>
        </li>
        <li>
          {user ? (
            <div>
              <button
                className="btn btn-outline-dark btn-sm px-3"
                onClick={() => navigate("/homeAgency")}
              >
                Home
              </button>
              <button
                className="btn btn-outline-dark btn-sm px-3"
                onClick={() => navigate("/profileAgency")}
              >
                Profile
              </button>
              <button
                className="btn btn-outline-dark btn-sm px-3"
                onClick={() => navigate("/usersAgency")}
              >
                Users
              </button>
              <button
                className="btn btn-outline-dark btn-sm px-3"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button
                className="btn btn-outline-dark btn-sm px-3"
                onClick={() => navigate("/loginUser")}
              >
                <strong>User Login</strong>
              </button>
              <button
                className="btn btn-outline-dark btn-sm px-3"
                onClick={() => navigate("/loginAgency")}
              >
                <strong>Agency Login</strong>
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavbarAgency;
