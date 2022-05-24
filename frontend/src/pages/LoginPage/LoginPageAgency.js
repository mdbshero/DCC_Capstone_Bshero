import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import NavbarAgency from "../../components/NavBar/NavBarAgency";

const LoginPageAgency = () => {
  const { loginAgency, isServerError } = useContext(AuthContext);
  const defaultValues = { email: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginAgency
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div><NavbarAgency/>
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <Link to="/registerAgency">Click to register Agency!</Link>
        <button className="btn btn-outline-dark btn-sm px-3">Login!</button>
      </form>
    </div>
    </div>
  );
};

export default LoginPageAgency;
