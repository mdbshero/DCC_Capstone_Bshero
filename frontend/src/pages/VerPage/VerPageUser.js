import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import jwtDecode from "jwt-decode";

const VerPageUser = () => {
  const [userFavorites, setUserFavorites] = useState([]);
  const [userVer, setUserVer] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ver, setVer] = useState([]);
  //const [allPeople, setAllPeople] = useState([]);
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

  //   async function getAll() {
  //     setAllPeople([]);
  //     console.log(jwt);
  //     let res = await axios.get(`http://localhost:3011/api/users`, config);
  //     for (let i = 0; i < res.data.length; i++) {
  //       if (user._id !== res.data[i]._id) {
  //         setAllPeople((allPeople) => [...allPeople, res.data[i]]);
  //       }
  //     }
  //   }

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
          .then((response) =>
            setVer((ver) => [...ver, response.data])
          );
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

  //   async function handleClickDecline(event, declined) {
  //     event.preventDefault();
  //     setFriends([]);
  //     setPending([]);
  //     let mainUser = user._id;
  //     console.log(declined._id);
  //     await axios.delete(
  //       `http://localhost:3011/api/users/${mainUser}/decline/${declined._id}`
  //     );
  //     getUserFriendInfo();
  //   }

  //   async function handleClickAccept(event, accepted) {
  //     event.preventDefault();
  //     setFriends([]);
  //     setPending([]);
  //     let mainUser = user._id;
  //     accepted = {
  //       userId: accepted._id,
  //     };
  //     //console.log(unfollowed);
  //     await axios.put(`http://localhost:3011/api/users/${mainUser}`, accepted);
  //     getUserFriendInfo();
  //   }

  //   async function handlePendingSubmit(event, requested) {
  //     event.preventDefault();
  //     let sender = {
  //       userId: user._id,
  //     };
  //     requested = requested._id;
  //     await axios.put(
  //       `http://localhost:3011/api/users/${requested}/pending`,
  //       sender
  //     );
  //   }

  useEffect(() => {
    getUserFavoritesInfo();
    // getAll();
  }, []);

  useEffect(() => {
    getFavoriteInfo();
  }, [userFavorites]);

    useEffect(() => {
      getVerAgencyInfo();
    }, [userVer]);
  return (
    <div>
      <h3>Friends Page for {user.name}!</h3>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Favorites</th>
              </tr>
            </thead>
            <tbody>
              {favorites &&
                favorites.map((favorite, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={`http://localhost:3011/${favorite.image}`}
                        ></img>
                        <h5>{favorite.name}</h5>
                        <button
                          type="submit"
                          id="deleteFavoriteButton"
                          onClick={(event) =>
                            handleClickUnFavorite(event, favorite)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th> Verified Agencies </th>
              </tr>
            </thead>
            <tbody>
              {ver &&
                ver.map((v, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={`http://localhost:3011/${v.image}`}></img>
                        <h5>{v.name}</h5>
                        <h5>{v.contact.street}</h5>
                        <h5>{v.contact.city}</h5>
                        <h5>{v.contact.state}</h5>
                        <h5>{v.contact.zip}</h5>
                        <h5>{v.contact.phone}</h5>
                        {/* <button
                          type="delete"
                          id="declinePendingButton"
                          onClick={(event) => handleClickAccept(event, e)}
                        >
                          Accept
                        </button>
                        <button
                          type="delete"
                          id="declinePendingButton"
                          onClick={(event) => handleClickDecline(event, e)}
                        >
                          Decline
                        </button> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* <div className="col-sm">
          <table className="table">
            <thead>
              <tr>
                <th>Send Friend Request</th>
              </tr>
            </thead>
            <tbody>
              {allPeople &&
                allPeople.map((a, index) => {
                  return (
                    <tr>
                      <td key={index}>
                        <img src={`http://localhost:3011/${a.image}`}></img>
                        <h5>{a.name}</h5>
                        <button
                          type="submit"
                          id="SendPendingButton"
                          onClick={(event) => handlePendingSubmit(event, a)}
                        >
                          Send Request
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default VerPageUser;
