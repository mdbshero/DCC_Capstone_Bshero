import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import jwtDecode from "jwt-decode";
import NavbarUser from "../../components/NavBar/NavBarUser";
import "./VerPage.css"

const VerPageUser = () => {
  const [userFavorites, setUserFavorites] = useState([]);
  const [userVer, setUserVer] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ver, setVer] = useState([]);
  const jwt = localStorage.getItem("token");
  const config = { headers: { Authorization: "Bearer " + jwt } };
  const { user } = useContext(AuthContext);

  async function getUserFavoritesInfo() {
    console.log(user._id);
    setUserFavorites([]);
    setUserVer([]);
    setFavorites([]);
    setVer([]);
    let userInfo = await axios.get(
      `http://localhost:3011/api/users/${user._id}`
    );
    setUserFavorites(userInfo.data.favAgency);
    setUserVer(userInfo.data.verAgency);
  }

  async function getFavoriteInfo() {
    setFavorites([]);
    for (let i = 0; i < userFavorites.length; i++) {
      await axios
        .get(`http://localhost:3011/api/agency/${userFavorites[i]}`)
        .then((response) =>
          setFavorites((favorites) => [...favorites, response.data])
        );
      console.log(favorites);
    }
  }

  async function getVerAgencyInfo() {
    setVer([]);
    for (let i = 0; i < userVer.length; i++) {
      await axios
        .get(`http://localhost:3011/api/agency/${userVer[i]}`)
        .then((response) => setVer((ver) => [...ver, response.data]));
    }
  }

  async function handleClickUnFavorite(event, unfavorited) {
    event.preventDefault();
    let mainUser = user._id;
    unfavorited = unfavorited._id;
    await axios.delete(
      `http://localhost:3011/api/users/${mainUser}/unfavorite/${unfavorited}`
    );
    getUserFavoritesInfo();
  }

  useEffect(() => {
    getUserFavoritesInfo();
  }, []);

  useEffect(() => {
    getFavoriteInfo();
  }, [userFavorites]);

  useEffect(() => {
    getVerAgencyInfo();
  }, [userVer]);
  return (
    <div>
      <NavbarUser />
      <div className="container-fluid">
        <div className="text-center ">
          <h1>Favorited and Verified Agencies</h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="border border-3 table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Favorites</th>
                    <th>Available Pets</th>
                  </tr>
                </thead>
                <tbody>
                  {favorites &&
                    favorites.map((favorite, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <td className="w-responsive">
                              <h5>{favorite.name}</h5>
                              <img
                                src={`http://localhost:3011/${favorite.image}`}
                              ></img>
                              <h6>{favorite.contact.street}</h6>
                              <h6>{favorite.contact.city}</h6>
                              <h6>{favorite.contact.state}</h6>
                              <h6>{favorite.contact.zip}</h6>
                              <h6>{favorite.contact.phone}</h6>
                            </td>
                            <div>
                              <button
                                type="submit"
                                className="btn btn-outline-dark btn-sm px-3"
                                id="deleteFavoriteButton"
                                onClick={(event) =>
                                  handleClickUnFavorite(event, favorite)
                                }
                              >
                                Unfavorite
                              </button>
                            </div>
                          </td>
                          <td>
                            {favorite.pets &&
                              favorite.pets.map((pet, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="card w-50 text-center border border-dark mb-2"
                                  >
                                    <img
                                      className="card-img-top"
                                      src={`http://localhost:3011/${pet.image}`}
                                    ></img>
                                    <div className="card-body">
                                      <h5 className="card-title">{pet.name}</h5>
                                      <div className="card-text">
                                        <h6>{pet.name}</h6>
                                        <h6>{pet.type}</h6>
                                        <h6>{pet.age}</h6>
                                        <h6>{pet.breed}</h6>
                                        <h6>{pet.personality}</h6>
                                      </div>
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
          <div className="col-md-6">
            <div className="border border-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Verified Agencies</th>
                    <th>Available Pets</th>
                  </tr>
                </thead>
                <tbody>
                  {ver &&
                    ver.map((v, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <td className="w-responsive">
                              <h5>{v.name}</h5>
                              <img
                                src={`http://localhost:3011/${v.image}`}
                              ></img>
                              <h6>{v.contact.street}</h6>
                              <h6>{v.contact.city}</h6>
                              <h6>{v.contact.state}</h6>
                              <h6>{v.contact.zip}</h6>
                              <h6>{v.contact.phone}</h6>
                            </td>
                          </td>
                          <td>
                            {v.pets &&
                              v.pets.map((pet, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="card text-center border border-dark mb-2"
                                  >
                                    <img
                                      className="card-img-top"
                                      src={`http://localhost:3011/${pet.image}`}
                                    ></img>
                                    <div className="card-body">
                                      <h5 className="card-title">{pet.name}</h5>
                                      <div className="card-text">
                                        <h6>{pet.name}</h6>
                                        <h6>{pet.type}</h6>
                                        <h6>{pet.age}</h6>
                                        <h6>{pet.breed}</h6>
                                        <h6>{pet.personality}</h6>
                                      </div>
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
      </div>
    </div>
  );
};

export default VerPageUser;
