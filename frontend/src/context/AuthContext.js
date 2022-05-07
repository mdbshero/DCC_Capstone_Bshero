import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const BASE_URL = "http://localhost:3011/api";
  const decodedUser = localStorage.getItem("token");
  const decodedToken = decodedUser ? jwtDecode(decodedUser) : null;
  const [user, setUser] = useState(() => decodedToken);
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (registerData) => {
    const form = new FormData();
    form.append("name", registerData.name);
    form.append("email", registerData.email);
    form.append("password", registerData.password);
    form.append("isAdmin", registerData.isAdmin);
    form.append("image", registerData.image);
    try {
      console.log(registerData);
      let response = await axios.post(`${BASE_URL}/users/register`, form);
      if (response.status === 200) {
        let token = response.headers["x-auth-token"];
        localStorage.setItem("token", JSON.stringify(token));
        setUser(jwtDecode(token));
        navigate("/");
      } else {
        navigate("/registerUser");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (loginData) => {
    try {
      let response = await axios.post(`${BASE_URL}/login`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data));
        setUser(jwtDecode(response.data));
        setIsServerError(false);
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.message);
      setIsServerError(true);
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
