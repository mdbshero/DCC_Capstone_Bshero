import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { useNavigate ,Link } from "react-router-dom";
import NavbarUser from "../../components/NavBar/NavBarUser";
import "./LandingPage.css"

const LoginPageUser = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { email: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div>
      <NavbarUser />
      <div className="container-fluid">
        <div className="text-center">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">New Pet Parent Registration</h5>
                  <p className="card-text">
                    Welcome a new family member with quick and easy user verification! In a few simple steps, you will be able to request pre-verification from adoption agencies in your area ensuring a quick and painless adoption process.
                  </p>
                  <button className="btn btn-dark" onClick={() => navigate("/RegisterUser")}>Register</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">New Agency Registration</h5>
                  <p className="card-text">
                    Make sure your rescues find their FURever home! Agencies will be able to pre-verify users based on key data points that all adoption agencies require. Easily add and remove pets to your profile for display and keep track of all users in your area!
                  </p>
                  <button className="btn btn-dark" onClick={() => navigate("/RegisterAgency")}>Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageUser;
