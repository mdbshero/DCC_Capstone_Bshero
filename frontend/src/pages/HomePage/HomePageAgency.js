import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const HomePageAgency = () => {
  const { user } = useContext(AuthContext);
  return <h1 className="container">Home Page for Agency: {user.name}!</h1>;
};

export default HomePageAgency;