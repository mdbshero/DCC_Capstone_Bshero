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
        <li className="brand">
          <b>fĕch</b>
        </li>
        <li>
          {user ? (
            <div>
            <button onClick={() => navigate("/homeAgency")}>Home</button>
            <button onClick={() => navigate("/profileAgency")}>Profile</button>
            <button onClick={() => navigate("/usersAgency")}>Users</button>
            <button onClick={logoutUser}>Logout</button>
          </div>
          ) : (
            <div>
              <button onClick={() => navigate("/loginUser")}>User Login</button>
              <button onClick={() => navigate("/loginAgency")}>
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
