import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const ProfileAgency = () => {
  const { user } = useContext(AuthContext);
  const [about, setAbout] = useState("");
  const [newAbout, setNewAbout] = useState("");
  const [contact, setContact] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();
  const [usState, setUsState] = useState("");
  const [image, setImage] = useState("");
  const jwt = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${jwt}` } };

  async function getUserAboutMeInfo() {
    let userInfo = await axios.get(
      `http://localhost:3011/api/agency/${user._id}`
    );
    console.log(userInfo.data)
    setAbout(userInfo.data.about);
    setImage(userInfo.data.image);
    setContact(userInfo.data.contact);
  }

  async function handleSubmitAbout(event) {
    event.preventDefault();
    let newAboutMe = {
      aboutMe: newAbout,
    };
    await axios.put(`http://localhost:3011/api/agency/${user._id}`, newAboutMe);
    getUserAboutMeInfo();
  }
//   async function handleSubmitPref(event) {
//     event.preventDefault();
//     let newPrefPet = {
//       prefPet: newPref,
//     };
//     await axios.put(`http://localhost:3011/api/users/${user._id}`, newPrefPet);
//     getUserAboutMeInfo();
//   }
  async function handleSubmitContact(event) {
    event.preventDefault();
    let newContact = {
      street: street,
      city: city,
      zip: zip,
      phone: phone,
      state: usState,
    };
    console.log(newContact)
    await axios.put(
      `http://localhost:3011/api/agency/${user._id}/contact`,
      newContact
    );
    getUserAboutMeInfo();
  }

  useEffect(() => {
    getUserAboutMeInfo();
  }, []);

  return (
    <div>
      <img src={`http://localhost:3011/${image}`}></img>
      {/* <form id="About" onSubmit={(event) => handleSubmitAbout(event)}>
        <label>Update About me:</label>
        <textarea
          type="text"
          defaultValue={""}
          onChange={(event) => setNewAbout(event.target.value)}
        />
        <button type="submit">Update</button>
      </form> */}
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
        <input type="text" onChange={(event) => setZip(event.target.value)} />
        <br />
        <label>Update Phone Number:</label>
        <input type="text" onChange={(event) => setPhone(event.target.value)} />
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
      {/* <div>
        <h2>About Me</h2>
        <div>
          <p>{about}</p>
        </div>
      </div> */}
      {/* <div>
        <h2>Preferred Pet Characteristics</h2>
        <div>
          <p>{pref}</p>
        </div>
        <form id="NewPref" onSubmit={(event) => handleSubmitPref(event)}>
          <label>Update Preferred Pet Characteristics:</label>
          <textarea
            type="text"
            defaultValue={""}
            onChange={(event) => setNewPref(event.target.value)}
          />
          <button type="submit">Update</button>
        </form>
      </div> */}
      <div>
        <h2>Contact Information</h2>
        <table>
            <thead>
          <tr>
            <th>Street</th>
            <td>{contact.street}</td>4
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
          </thead>
        </table>
      </div>
    </div>
  );
};

export default ProfileAgency;
