import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import NavbarUser from "../../components/NavBar/NavBarUser";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css";

const ProfileUser = () => {
  const { user } = useContext(AuthContext);
  const [about, setAbout] = useState("");
  const [newAbout, setNewAbout] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [ver, setVer] = useState("");
  const [pref, setPref] = useState("");
  const [newPref, setNewPref] = useState("");
  const [contact, setContact] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();
  const [usState, setUsState] = useState("");
  const jwt = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${jwt}` } };
  const navigate = useNavigate();
  const validPhoneNumber = /^\d{0,10}$/;
  async function getUserAboutMeInfo() {
    let userInfo = await axios.get(
      `http://localhost:3011/api/users/${user._id}`
    );
    setAbout(userInfo.data.aboutMe);
    setImage(userInfo.data.image);
    setVer(userInfo.data.verification);
    setPref(userInfo.data.prefPet);
    setContact(userInfo.data.contact);
  }

  async function handleSubmitAbout(event) {
    event.preventDefault();
    let newAboutMe = {
      aboutMe: newAbout,
    };
    await axios.put(`http://localhost:3011/api/users/${user._id}`, newAboutMe);
    getUserAboutMeInfo();
    event.target.reset();
  }
  async function handleSubmitPref(event) {
    event.preventDefault();
    let newPrefPet = {
      prefPet: newPref,
    };
    await axios.put(`http://localhost:3011/api/users/${user._id}`, newPrefPet);
    getUserAboutMeInfo();
    event.target.reset();
  }
  async function handleSubmitContact(event) {
    event.preventDefault();
    let newContact = {
      street: street,
      city: city,
      zip: zip,
      phone: phone,
      state: usState,
    };
    await axios.put(
      `http://localhost:3011/api/users/${user._id}/contact`,
      newContact
    );
    getUserAboutMeInfo();
    event.target.reset();
  }

  const handlePhone = ({ target }) => {
    const newPhone = target.value;
    const isValid = validPhoneNumber.test(newPhone);
    if (isValid) {
      setPhone(newPhone);
    }
  };

  async function handleSubmitImage(event) {
    event.preventDefault();
    let imageUp = new FormData();
    imageUp.append("image", document.getElementById("imageUpload").files[0]);
    await axios.put(
      `http://localhost:3011/api/users/${user._id}/image`,
      imageUp
    );
    getUserAboutMeInfo();
    event.target.reset();
  }

  useEffect(() => {
    getUserAboutMeInfo();
  }, []);

  return (
    <div>
      <NavbarUser />
      <div className="container-fluid">
        <h1 className="text-center">{`Profile Page of ${user.name}`}</h1>
        <div className="row">
          <div className="col-md-6">
            <div>
              <img src={`http://localhost:3011/${image}`}></img>
              <div>
                <form onSubmit={(event) => handleSubmitImage(event)}>
                  <label>
                    Update Profile Picture:{" "}
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      id="imageUpload"
                      className="form-control"
                    />
                  </label>
                  <button className="btn btn-dark">Update</button>
                </form>
              </div>
            </div>
            <div className="border border-3 text-center">
              <div>
                <h2>About Me</h2>
                <div>
                  <p>{about}</p>
                </div>
              </div>
              <form
                className="form"
                id="AboutMe"
                onSubmit={(event) => handleSubmitAbout(event)}
              >
                <div className="form-outline mb4">
                  <textarea
                    type="text"
                    className="form-control"
                    id="aboutMe"
                    defaultValue={""}
                    onChange={(event) => setNewAbout(event.target.value)}
                  />
                  <label className="form-label" for="aboutMe">
                    Update About me:
                  </label>
                </div>
                <button className="btn btn-dark" type="submit">
                  Update
                </button>
              </form>
            </div>
            <div className="border border-3 text-center">
              <h2>Preferred Pet Characteristics</h2>
              <div>
                <p>{pref}</p>
              </div>
              <form
                className="form"
                id="NewPref"
                onSubmit={(event) => handleSubmitPref(event)}
              >
                <label>
                  <strong>Update Preferred Pet Characteristics:</strong>
                </label>
                <textarea
                  type="text"
                  defaultValue={""}
                  onChange={(event) => setNewPref(event.target.value)}
                />
                <button className="btn btn-dark" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border border-3">
              <div className="text-center">
                <h2>Contact Information</h2>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Street</th>
                      <td>{contact.street}</td>
                    </tr>
                    <tr>
                      <th>City</th>
                      <td>{contact.city}</td>
                    </tr>
                    <tr>
                      <th>State</th>
                      <td>{contact.state}</td>
                    </tr>
                    <tr>
                      <th>Zip Code</th>
                      <td>{contact.zip}</td>
                    </tr>
                    <tr>
                      <th>Phone Number</th>
                      <td>{contact.phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h2 className="text-center">Update Contact Information:</h2>
              <div>
                <form
                  id="Contact"
                  className="form"
                  onSubmit={(event) => handleSubmitContact(event)}
                >
                  <div className="form-group">
                    <label>Update Street:</label>
                    <input
                      type="text"
                      id="street"
                      defaultValue={""}
                      onChange={(event) => setStreet(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Update City:</label>
                    <input
                      type="text"
                      id="city"
                      defaultValue={""}
                      onChange={(event) => setCity(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Update State:</label>
                    <input
                      type="text"
                      id="state"
                      defaultValue={""}
                      onChange={(event) => setUsState(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Update Zip:</label>
                    <input
                      type="text"
                      id="zip"
                      onChange={(event) => setZip(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Update Phone Number:</label>
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={handlePhone}
                    />
                  </div>
                  <button className="btn btn-dark" type="submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
            <div className="border border-3">
              <h2>Verification</h2>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Employment</th>
                    <td>{ver.employment}</td>
                  </tr>
                  <tr>
                    <th>Type of Home</th>
                    <td>{ver.homeType}</td>
                  </tr>
                  <tr>
                    <th>Housing Status</th>
                    <td>{ver.homeStatus}</td>
                  </tr>
                  <tr>
                    <th>Time in Home</th>
                    <td>{ver.homeTime}</td>
                  </tr>
                  <tr>
                    <th>Home Noise Level</th>
                    <td>{ver.homeNoise}</td>
                  </tr>
                  <tr>
                    <th>Landlord Name:</th>
                    <td>{ver.landName}</td>
                  </tr>
                  <tr>
                    <th>Landlord Number</th>
                    <td>{ver.landNumber}</td>
                  </tr>
                  <tr>
                    <th>Number of Adults</th>
                    <td>{ver.aNum}</td>
                  </tr>
                  <tr>
                    <th>Number of Children</th>
                    <td>{ver.cNum}</td>
                  </tr>
                  <tr>
                    <th>Reason for Adoption</th>
                    <td>{ver.adoptReason}</td>
                  </tr>
                  <tr>
                    <th>Average time pet will be alone per day</th>
                    <td>{ver.petHours}</td>
                  </tr>
                  <tr>
                    <th>Where pet will be kept during day</th>
                    <td>{ver.petLoca}</td>
                  </tr>
                  <tr>
                    <th>Where pet will sleep</th>
                    <td>{ver.petSleep}</td>
                  </tr>
                  <tr>
                    <th>Fencing</th>
                    <td>{ver.fence}</td>
                  </tr>
                  <tr>
                    <th>Veterinarian Name</th>
                    <td>{ver.vetName}</td>
                  </tr>
                  <tr>
                    <th>Veterinarian Number</th>
                    <td>{ver.vetNumber}</td>
                  </tr>
                  <tr>
                    <th>Preferred Temperment</th>
                    <td>{ver.prefTemp}</td>
                  </tr>
                  <tr>
                    <th>Dislikes</th>
                    <td>{ver.petDis}</td>
                  </tr>
                  <tr>
                    <th>Pet Energy Level</th>
                    <td>{ver.petEn}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-dark"
                onClick={() => navigate("/verUser")}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
