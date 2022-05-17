import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import NavbarUser from "../../components/NavBar/NavBarUser";

const HomePageUser = () => {
  const { user } = useContext(AuthContext);
  const [agencies, setAgencies] = useState([]);
  const [region, setRegion] = useState();
  const jwt = JSON.parse(localStorage.getItem("token"));
  // const config = {headers : { 'Authorization' : `Bearer ${jwt}`}};

  async function geoLocation() {
    let gloc = await axios.get(
      "http://ip-api.com/json/?fields=country,regionName,city,zip"
    );
    let geoInput = {
      regionName: gloc.data.regionName,
      zip: gloc.data.zip,
      country: gloc.data.country,
      city: gloc.data.city,
    };
    await axios.put(
      `http://localhost:3011/api/users/${user._id}/geo`,
      geoInput
    );
  }

  async function getUserGeo() {
    let userInfo = await axios.get(
      `http://localhost:3011/api/users/${user._id}`
    );
    setRegion(userInfo.data.geo.regionName);
  }

  async function localAgencies() {
    setAgencies([]);
    let res = await axios.get(`http://localhost:3011/api/agency`, {
      headers: { "x-auth-token": jwt },
    });
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].contact.state == region) {
        setAgencies((agencies) => [...agencies, res.data[i]]);
      }
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
    geoLocation();
    getUserGeo();
  }, []);

  useEffect(() => {
    localAgencies();
  }, [region]);

  return (
    <div>
      <NavbarUser />
      <div className="container-fluid">
        <h1 className="container">These dogs can't wait to meet you {user.name}!</h1>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <strong>
                    <h2>Local Agencies</h2>
                  </strong>
                </th>
                <th>
                  <strong>
                    <h2>Available Pets</h2>
                  </strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {agencies &&
                agencies.map((a, index) => {
                  return (
                    <tr key={index}>
                      <div className="card w-50 text-center border border-dark mb-2">
                        <td>
                          <div>
                            <h3>
                              <strong>{a.name}</strong>
                            </h3>
                            <img src={`http://localhost:3011/${a.image}`}></img>
                          </div>
                          <div>
                            <button
                              className="btn btn-outline-dark btn-sm px-3"
                              type="submit"
                              id="SendFavoriteButton"
                              onClick={(event) =>
                                handleFavoriteSubmit(event, a._id)
                              }
                            >
                              Favorite
                            </button>
                            <button
                              className="btn btn-outline-dark btn-sm px-3"
                              type="submit"
                              id="SendVerificationButton"
                              onClick={(event) => handleVerSubmit(event, a._id)}
                            >
                              Request
                            </button>
                          </div>
                          <h5>
                            <strong>Contact Information</strong>
                          </h5>
                          <h6>{a.contact.street}</h6>
                          <h6>{a.contact.city}</h6>
                          <h6>{a.contact.zip}</h6>
                          <h6>{a.contact.state}</h6>
                          <h6>{a.contact.phone}</h6>
                          <h6>{a.email}</h6>
                        </td>
                      </div>
                      <td>
                        {a.pets &&
                          a.pets.map((pet, index) => {
                            return (
                              <div
                                key={index}
                                className="card w-50 text-center border border-dark mb-2"
                              >
                                <img
                                  src={`http://localhost:3011/${pet.image}`}
                                ></img>
                                <div className="card-body">
                                  <h5 className="card-title">{pet.name}</h5>
                                  <h6>{pet.name}</h6>
                                  <h6>{pet.type}</h6>
                                  <h6>{pet.age}</h6>
                                  <h6>{pet.breed}</h6>
                                  <h6>{pet.personality}</h6>
                                </div>
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
    </div>
  );
};

export default HomePageUser;
