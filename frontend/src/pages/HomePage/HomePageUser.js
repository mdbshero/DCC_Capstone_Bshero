import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const HomePageUser = () => {
  const { user } = useContext(AuthContext);
  return <h1 className="container">Home Page for User: {user.name}!</h1>;
};

export default HomePageUser;
