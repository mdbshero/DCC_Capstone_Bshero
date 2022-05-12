import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

const HomePageUser = () => {
  const { user } = useContext(AuthContext);
  const [agencies, setAgencies] = useState([]);
  const jwt = JSON.parse(localStorage.getItem("token"));
  // const config = {headers : { 'Authorization' : `Bearer ${jwt}`}};

  async function localAgencies() {
    setAgencies([]);
    console.log(jwt)
    let res = await axios.get(`http://localhost:3011/api/agency`, {headers : { "x-auth-token": jwt}});
    console.log(res)
    for (let i = 0; i < res.data.length; i++) {
      setAgencies((agencies) => [...agencies, res.data[i]]);
    }
  }

  useEffect(() => {
    localAgencies();
  }, []);

  return (
    <div>
      <h1 className="container">Home Page for User: {user.name}!</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Local Agencies</th>
            </tr>
          </thead>
          <tbody>
            {agencies &&
              agencies.map((a, index) => {
                return (
                  <tr>
                    <td key={index}>
                      <img src={`http://localhost:3011/${a.image}`}></img>
                      <h5>{a.name}</h5>
                      {/* <button
                        type="submit"
                        id="SendPendingButton"
                        onClick={(event) => handlePendingSubmit(event, a)}
                      >
                        Send Request
                      </button> */}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePageUser;
