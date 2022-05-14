import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const NavbarUser = () => {
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
              <button onClick={() => navigate("/homeUser")}>Home</button>
              <button onClick={() => navigate("/profileUser")}>Profile</button>
              <button onClick={() => navigate("/verUser")}>Verification</button>
              <button onClick={() => navigate("/agenciesUser")}>Agencies</button>
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

export default NavbarUser;
