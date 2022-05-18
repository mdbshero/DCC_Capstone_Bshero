import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import NavbarAgency from "../../components/NavBar/NavBarAgency";

const HomePageAgency = () => {
  const { user } = useContext(AuthContext);
  const [petParents, setPetParents] = useState([]);
  const [region, setRegion] = useState();
  const jwt = JSON.parse(localStorage.getItem("token"));

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
      if (res.data[i].contact.state == region) {
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
  }, [region]);

  return (
    <div className="container-fluid">
      <NavbarAgency />
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="mb-3">Local Users </h3>
            </div>
            <div className="col-12">
              <div
                id="carouselExampleIndicators2"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row">
                      {petParents &&
                        petParents.map((a, index) => {
                          return (
                            <div className="col-md-4 mb-3">
                              <div key={index}>
                                <div className="card">
                                  <img
                                    className="img-fluid"
                                    src={`http://localhost:3011/${a.image}`}
                                  ></img>
                                  <div className="card-body">
                                    <h3 className="card-title">{a.name}</h3>
                                    <h6>{a.contact.city}</h6>
                                    <h6>{a.contact.state}</h6>
                                    <h6>{a.contact.phone}</h6>
                                    <h6>{a.email}</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageAgency;
