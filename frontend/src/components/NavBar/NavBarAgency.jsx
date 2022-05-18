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
          <b>fĕch</b>
        </li>
        <li>
          {user ? (
            <div>
            <button className="btn btn-primary" onClick={() => navigate("/homeAgency")}>Home</button>
            <button className="btn btn-primary" onClick={() => navigate("/profileAgency")}>Profile</button>
            <button className="btn btn-primary" onClick={() => navigate("/usersAgency")}>Users</button>
            <button className="btn btn-primary" onClick={logoutUser}>Logout</button>
          </div>
          ) : (
            <div>
              <button className="btn btn-primary" onClick={() => navigate("/loginUser")}>User Login</button>
              <button className="btn btn-primary" onClick={() => navigate("/loginAgency")}>
                Agency Login
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavbarAgency;
