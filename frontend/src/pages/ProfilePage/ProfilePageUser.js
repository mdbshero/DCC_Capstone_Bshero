import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const ProfileUser = (props) => {
  const { user } = useContext(AuthContext);
  const [about, setAbout] = useState("");
  const [newAbout, setNewAbout] = useState("");
  const [image, setImage] = useState("");
  const [ver, setVer] = useState("");
  const [pref, setPref] = useState("");
  const [contact, setContact] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();
  const [usState, setUsState] = useState("");
  const jwt = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${jwt}` } };

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
  }
  async function handleSubmitContact(event) {
    event.preventDefault();
    let newContact = {
      street: street,
      city: city,
      zip: zip,
      phone: phone,
      state: usState
    };
    await axios.put(`http://localhost:3011/api/users/${user._id}/contact`, newContact);
    getUserAboutMeInfo();
  }

  useEffect(() => {
    getUserAboutMeInfo();
  }, []);

  return (
    <div>
      <img src={`http://localhost:3011/${image}`}></img>
      <form id="AboutMe" onSubmit={(event) => handleSubmitAbout(event)}>
        <label>Update About me:</label>
        <textarea
          type="text"
          defaultValue={""}
          onChange={(event) => setNewAbout(event.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      <h2>Update Contact Information:</h2>
      <form id="Contact" onSubmit={(event) => handleSubmitContact(event)}>
        <label>Update street:</label>
        <input
          type="text"
          defaultValue={""}
          onChange={(event) => setStreet(event.target.value)}
        />
        <br />
        <label>Update City:</label>
        <input
          type="text"
          defaultValue={""}
          onChange={(event) => setCity(event.target.value)}
        />
        <br />
        <label>Update Zip:</label>
        <input
          type="text"
          onChange={(event) => setZip(event.target.value)}
        />
        <br />
        <label>Update Phone Number:</label>
        <input
          type="text"
          onChange={(event) => setPhone(event.target.value)}
        />
        <br />
        <label>Update State:</label>
        <input
          type="text"
          defaultValue={""}
          onChange={(event) => setUsState(event.target.value)}
        />
        <br />
        <button type="submit">Update</button>
      </form>
      <div>
        <h2>About Me</h2>
        <div>
          <p>{about}</p>
        </div>
      </div>
      <div>
        <h2>Verification</h2>
        <table>
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
          <tr>
            <th>Ideals</th>
            <td>{ver.petIdeal}</td>
          </tr>
          <tr>
            <th>Untolerable Habits</th>
            <td>{ver.petBadhab}</td>
          </tr>
        </table>
      </div>
      <div>
        <h2>Preferred Pet Characteristics</h2>
        <div>
          <p>{pref}</p>
        </div>
      </div>
      <div>
        <h2>Contact Information</h2>
        <table>
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
        </table>
      </div>
    </div>
  );
};

export default ProfileUser;
