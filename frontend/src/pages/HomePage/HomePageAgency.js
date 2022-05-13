import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

const HomePageAgency = () => {
  const { user } = useContext(AuthContext);
  const [petParents, setPetParents] = useState([]);
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
      `http://localhost:3011/api/agency/${user._id}/geo`,
      geoInput
    );
  }

  async function getAgencyGeo() {
    let agencyInfo = await axios.get(
      `http://localhost:3011/api/agency/${user._id}`
    );
    setRegion(agencyInfo.data.geo.regionName);
  }

  async function localPetParents() {
    setPetParents([]);
    let res = await axios.get(`http://localhost:3011/api/users`, {
      headers: { "x-auth-token": jwt },
    });
    for (let i = 0; i < res.data.length; i++) {
      console.log(res.data[i].contact.state)
      if (res.data[i].contact.state == region){
      setPetParents((petParents) => [...petParents, res.data[i]]);
      }
    }
  }

  useEffect(() => {
    geoLocation();
    getAgencyGeo();
  }, []);

  useEffect(() => {
    localPetParents();
  }, [region])

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
            {petParents &&
              petParents.map((a, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={`http://localhost:3011/${a.image}`}></img>
                      <h5>{a.name}</h5>
                      <div>
                        <h6>{a.contact.street}</h6>
                        <h6>{a.contact.city}</h6>
                        <h6>{a.contact.state}</h6>
                        <h6>{a.contact.zip}</h6>
                        <h6>{a.contact.phone}</h6>
                      </div>
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

export default HomePageAgency;
