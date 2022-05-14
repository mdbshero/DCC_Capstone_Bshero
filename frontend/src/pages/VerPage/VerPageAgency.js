import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import NavbarAgency from "../../components/NavBar/NavBarAgency";

const VerPageAgency = () => {
  const [agencyPending, setAgencyPending] = useState([]);
  const [agencyVer, setAgencyVer] = useState([]);
  const [pending, setPending] = useState([]);
  const [ver, setVer] = useState([]);
  const { user } = useContext(AuthContext);

  async function getAgencyUserInfo() {
    console.log(user._id);
    setAgencyPending([]);
    setAgencyVer([]);
    setPending([]);
    setVer([]);
    let agencyInfo = await axios.get(
      `http://localhost:3011/api/agency/${user._id}`
    );
    console.log(agencyInfo.data.pendingUser);
    setAgencyPending(agencyInfo.data.pendingUser);
    setAgencyVer(agencyInfo.data.verUser);
  }

  async function getAgencyPending() {
    setPending([]);
    for (let i = 0; i < agencyPending.length; i++) {
      await axios
        .get(`http://localhost:3011/api/users/${agencyPending[i]}`)
        .then((response) =>
          setPending((favorites) => [...favorites, response.data])
        );
      console.log(pending);
    }
  }

  async function getVerUserInfo() {
    setVer([]);
    for (let i = 0; i < agencyVer.length; i++) {
      await axios
        .get(`http://localhost:3011/api/users/${agencyVer[i]}`)
        .then((response) => setVer((ver) => [...ver, response.data]));
    }
  }

  async function handleClickDecline(event, declined) {
    event.preventDefault();
    setVer([]);
    setPending([]);
    let mainUser = user._id;
    await axios.delete(
      `http://localhost:3011/api/agency/${mainUser}/decline/${declined._id}`
    );
    getAgencyUserInfo();
  }

  async function handleClickAccept(event, accepted) {
    event.preventDefault();
    setVer([]);
    setPending([]);
    let mainUser = user._id;
    await axios.put(
      `http://localhost:3011/api/agency/${mainUser}/accept/${accepted._id}`,
      accepted
    );
    getAgencyUserInfo();
  }

  useEffect(() => {
    getAgencyUserInfo();
  }, []);

  useEffect(() => {
    getAgencyPending();
  }, [agencyPending]);

  useEffect(() => {
    getVerUserInfo();
  }, [agencyVer]);
  return (
    <div>
      <NavbarAgency />
      <div>
        <h3>Friends Page for {user.name}!</h3>
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Verfied Users</th>
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
                  <th> Pending User Requests </th>
                </tr>
              </thead>
              <tbody>
                {pending &&
                  pending.map((pend, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={`http://localhost:3011/${pend.image}`}
                          ></img>
                          <h5>{pend.name}</h5>
                          <button
                            type="accept"
                            id="acceptPendingButton"
                            onClick={(event) => handleClickAccept(event, pend)}
                          >
                            Accept
                          </button>
                          <button
                            type="delete"
                            id="declinePendingButton"
                            onClick={(event) => handleClickDecline(event, pend)}
                          >
                            Decline
                          </button>
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
  );
};

export default VerPageAgency;
