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
      <div className="container-fluid">
        <div className="text-center">
          <h3>Verification Page for {user.name}!</h3>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="border border-3">
              <table className="table">
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
                            <h4>{v.name}</h4>
                            <h6>{v.contact.street}</h6>
                            <h6>{v.contact.city}</h6>
                            <h6>{v.contact.state}</h6>
                            <h6>{v.contact.zip}</h6>
                            <h6>{v.contact.phone}</h6>
                            <h6>{v.email}</h6>
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
                    <th> Pending User Requests </th>
                    <th>Verification Information</th>
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
                            <h6>{pend.contact.phone}</h6>
                            <h6>{pend.email}</h6>
                            <button
                              type="accept"
                              className="btn btn-outline-dark btn-sm px-3"
                              id="acceptPendingButton"
                              onClick={(event) =>
                                handleClickAccept(event, pend)
                              }
                            >
                              Accept
                            </button>
                            <button
                              type="delete"
                              className="btn btn-outline-dark btn-sm px-3"
                              id="declinePendingButton"
                              onClick={(event) =>
                                handleClickDecline(event, pend)
                              }
                            >
                              Decline
                            </button>
                          </td>
                          <td>
                            Employment: {pend.verification.employment}
                            <br />
                            Type of Home: {pend.verification.homeType}
                            <br />
                            Housing Status: {pend.verification.homeStatus}
                            <br />
                            Time in Home: {pend.verification.homeTime}
                            <br />
                            Home Noise Level: {pend.verification.homeNoise}
                            <br />
                            Landlord Name: {pend.verification.landName}
                            <br />
                            Landlord Number: {pend.verification.landNumber}
                            <br />
                            Number of Adults: {pend.verification.aNum}
                            <br />
                            Number of Children: {pend.verification.cNum}
                            <br />
                            Reason for Adoption: {pend.verification.adoptReason}
                            <br />
                            Average time pet will be alone per day:{" "}
                            {pend.verification.petHours}
                            <br />
                            EmployWhere pet will be kept during dayment:{" "}
                            {pend.verification.petLoca}
                            <br />
                            Where pet will sleep: {pend.verification.petSleep}
                            <br />
                            Fencing: {pend.verification.fence}
                            <br />
                            Veterinarian Name: {pend.verification.vetName}
                            <br />
                            Veterinarian Number: {pend.verification.vetNumber}
                            <br />
                            Preferred Temperment: {pend.verification.prefTemp}
                            <br />
                            Dislikes: {pend.verification.petDis}
                            <br />
                            Pet Energy Level: {pend.verification.petEn}
                            <br />
                            Ideals: {pend.verification.petIdeal}
                            <br />
                            Untolerable Habits Habitsoyment:{" "}
                            {pend.verification.petBadHab}
                            <br />
                            Agreement One: {pend.verification.agreeOne}
                            <br />
                            Agreement Two: {pend.verification.agreeTwo}
                            <br />
                            Agreement Three: {pend.verification.agreeThree}
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

export default VerPageAgency;
