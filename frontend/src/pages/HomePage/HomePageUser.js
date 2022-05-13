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
    let res = await axios.get(`http://localhost:3011/api/agency`, {
      headers: { "x-auth-token": jwt },
    });
    for (let i = 0; i < res.data.length; i++) {
      setAgencies((agencies) => [...agencies, res.data[i]]);
    }
  }

  async function handleFavoriteSubmit(event, requested) {
    event.preventDefault();
    requested = {
      agencyId: requested,
    };
    console.log(requested);
    await axios.put(
      `http://localhost:3011/api/users/${user._id}/favorite`,
      requested
    );
    console.log(requested);
  }
  async function handleVerSubmit(event, requested) {
    event.preventDefault();
    console.log(requested);
    await axios.put(
      `http://localhost:3011/api/users/${user._id}/verificationReq/${requested}`
    );
    console.log(requested);
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
                      <button
                        type="submit"
                        id="SendFavoriteButton"
                        onClick={(event) => handleFavoriteSubmit(event, a._id)}
                      >
                        Favorite
                      </button>
                      <button
                        type="submit"
                        id="SendVerificationButton"
                        onClick={(event) => handleVerSubmit(event, a._id)}
                      >
                        Send Request
                      </button>
                      {a.pets &&
                        a.pets.map((pet, index) => {
                          return (
                            <div>
                              <img
                                src={`http://localhost:3011/${pet.image}`}
                              ></img>
                              <h6>{pet.name}</h6>
                              <h6>{pet.name}</h6>
                              <h6>{pet.type}</h6>
                              <h6>{pet.age}</h6>
                              <h6>{pet.breed}</h6>
                              <h6>{pet.personality}</h6>
                            </div>
                          );
                        })}
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
