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
                    <tr key={index}>
                      <td>
                        <img src={`http://localhost:3011/${a.image}`}></img>
                        <h5>{a.name}</h5>
                        <button
                          type="submit"
                          id="SendFavoriteButton"
                          onClick={(event) =>
                            handleFavoriteSubmit(event, a._id)
                          }
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
                              <div key={index}>
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
    </div>
  );
};

export default HomePageUser;
