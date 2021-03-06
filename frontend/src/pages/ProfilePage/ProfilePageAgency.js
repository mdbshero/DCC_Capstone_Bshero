import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import NavbarAgency from "../../components/NavBar/NavBarAgency";
import FormData from "form-data";
import "./Profile.css"

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
  const [prefUser, setPrefUser] = useState("");
  const [newPrefUser, setNewPrefUser] = useState("");
  const [pets, setPets] = useState([]);
  const [aboutAg, setaboutAg] = useState("");
  const [fees, setFees] = useState();
  const [goals, setGoals] = useState("");
  const [pName, setPName] = useState("");
  const [pType, setPType] = useState("");
  const [pAge, setPAge] = useState("");
  const [pBreed, setPBreed] = useState("");
  const [pPersonality, setPPersonality] = useState("");
  const [type, setType] = useState("");
  const jwt = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${jwt}` } };

  async function getUserAboutMeInfo() {
    let userInfo = await axios.get(
      `http://localhost:3011/api/agency/${user._id}`
    );
    setAbout(userInfo.data.about);
    setImage(userInfo.data.image);
    setContact(userInfo.data.contact);
    setPrefUser(userInfo.data.prefUser);
    setPets(userInfo.data.pets);
  }

  async function handleSubmitPrefUser(event) {
    event.preventDefault();
    let newPref = {
      prefUser: newPrefUser,
    };
    await axios.put(`http://localhost:3011/api/agency/${user._id}`, newPref);
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
      `http://localhost:3011/api/agency/${user._id}/contact`,
      newContact
    );
    getUserAboutMeInfo();
    event.target.reset();
  }
  async function handleSubmitInfo(event) {
    event.preventDefault();
    let newInfo = {
      aboutAgency: aboutAg,
      fees: fees,
      goals: goals,
      typePet: type,
    };
    await axios.put(
      `http://localhost:3011/api/agency/${user._id}/about`,
      newInfo
    );
    getUserAboutMeInfo();
    event.target.reset();
  }

  async function petDelete(_id, e) {
    e.preventDefault();
    let res = await axios.delete(
      `http://localhost:3011/api/agency/${user._id}/deletePet/${_id}`
    );
    getUserAboutMeInfo();
  }

  async function handleSubmitPet(e) {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append(
      "image",
      document.getElementById("imageUploadPet").files[0]
    );
    bodyFormData.append("name", pName);
    bodyFormData.append("type", pType);
    bodyFormData.append("age", pAge);
    bodyFormData.append("breed", pBreed);
    bodyFormData.append("personality", pPersonality);

    await axios.put(
      `http://localhost:3011/api/agency/${user._id}/pets`,
      bodyFormData
    );
    getUserAboutMeInfo();
    e.target.reset();
  }

  async function handleSubmitImage(event) {
    event.preventDefault();
    let imageUp = new FormData();
    imageUp.append("image", document.getElementById("imageUpload").files[0]);
    await axios.put(
      `http://localhost:3011/api/agency/${user._id}/image`,
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
      <NavbarAgency />
      <div className="container-fluid">
        <h1 className="text-center">{`Profile Page of ${user.name}`}</h1>
        <div className="row">
          <div className="col-md-6">
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
            <div className=" border border-3">
              <div>
                <h2 className="text-center">Agency Information</h2>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>About:</th>
                      <td>{about.aboutAgency}</td>
                    </tr>
                    <tr>
                      <th>Fees:</th>
                      <td>{about.fees}</td>
                    </tr>
                    <tr>
                      <th>Goals:</th>
                      <td>{about.goals}</td>
                    </tr>
                    <tr>
                      <th>What types of pets we have:</th>
                      <td>{about.typePet}</td>
                    </tr>
                  </thead>
                </table>
              </div>
              <h2 className="text-center">Update Agency Information:</h2>
              <form
                className="form"
                id="Agency Information"
                onSubmit={(event) => handleSubmitInfo(event)}
              >
                <div>
                  <label>Update About:</label>
                  <input
                    type="text"
                    defaultValue={""}
                    onChange={(event) => setaboutAg(event.target.value)}
                  />
                </div>
                <div>
                  <label>Update Fees:</label>
                  <input
                    type="text"
                    onChange={(event) => setFees(event.target.value)}
                  />
                </div>
                <div>
                  <label>Update Goals:</label>
                  <input
                    type="text"
                    onChange={(event) => setGoals(event.target.value)}
                  />
                </div>
                <div>
                  <label>Update Type of Pets:</label>
                  <input
                    type="text"
                    onChange={(event) => setType(event.target.value)}
                  />
                </div>
                <button className="btn btn-dark" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <div className="border border-3">
                <div>
                  <h2 className="text-center">Contact Information</h2>
                  <div className="text-center">
                    <table className="table table-borderless table-sm">
                      <thead>
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
                      </thead>
                    </table>
                  </div>
                </div>
                <h2 className="text-center">Update Contact Information:</h2>
                <form
                  className="form"
                  id="Contact"
                  onSubmit={(event) => handleSubmitContact(event)}
                >
                  <div>
                    <label>Update street:</label>
                    <input
                      type="text"
                      defaultValue={""}
                      onChange={(event) => setStreet(event.target.value)}
                    />
                  </div>
                  <div>
                    <label>Update City:</label>
                    <input
                      type="text"
                      defaultValue={""}
                      onChange={(event) => setCity(event.target.value)}
                    />
                  </div>
                  <div>
                    <label>Update State:</label>
                    <input
                      type="text"
                      defaultValue={""}
                      onChange={(event) => setUsState(event.target.value)}
                    />
                  </div>
                  <div>
                    <label>Update Zip:</label>
                    <input
                      type="text"
                      onChange={(event) => setZip(event.target.value)}
                    />
                  </div>
                  <div>
                    <label>Update Phone Number:</label>
                    <input
                      type="text"
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>
                  <button className="btn btn-dark" type="submit">
                    Update
                  </button>
                </form>
              </div>
              <div className="border border-3">
                <h2 className="text-center">Preferred User Characteristics</h2>
                <div>
                  <p>{prefUser}</p>
                </div>
                <form
                  className="form"
                  id="NewPrefUser"
                  onSubmit={(event) => handleSubmitPrefUser(event)}
                >
                  <label>
                    <strong>Update Preferred User Characteristics:</strong>
                  </label>
                  <textarea
                    type="text"
                    defaultValue={""}
                    onChange={(event) => setNewPrefUser(event.target.value)}
                  />
                  <button className="btn btn-dark" type="submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
            <div className="border border-3">
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
                              <h2>Available Pets</h2>
                              {pets &&
                                pets.map((pets, key) => {
                                  return (
                                    <div className="col-md-4 mb-3">
                                      <div className="card" key={key}>
                                        <div>
                                          <div>
                                            <img
                                              src={`http://localhost:3011/${pets.image}`}
                                            ></img>
                                          </div>
                                        </div>
                                        <div>
                                          <div>
                                            <strong>Name:</strong>
                                          </div>
                                          <div>{pets.name}</div>
                                        </div>
                                        <div>
                                          <div>
                                            <strong>Type:</strong>
                                          </div>
                                          <div>{pets.type}</div>
                                        </div>
                                        <div>
                                          <div>
                                            <strong>Age:</strong>
                                          </div>
                                          <div>{pets.age}</div>
                                        </div>
                                        <div>
                                          <div>
                                            <strong>Breed:</strong>
                                          </div>
                                          <div>{pets.breed}</div>
                                        </div>
                                        <div>
                                          <div>
                                            <strong>Personality:</strong>
                                          </div>
                                          <div>{pets.personality}</div>
                                        </div>
                                        <div>
                                          <div>
                                            <button
                                              className="btn btn-dark"
                                              onClick={(e) =>
                                                petDelete(pets._id, e)
                                              }
                                              type="submit"
                                            >
                                              Delete
                                            </button>
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
              <h2 className="text-center">Add Pets</h2>
              <form
                className="form-control"
                id="Add Pets"
                onSubmit={(event) => handleSubmitPet(event)}
              >
                <div>
                  <label>Image:</label>
                  <input
                    className="form-control"
                    type="file"
                    id="imageUploadPet"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
                <div>
                  <label>Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={""}
                    onChange={(event) => setPName(event.target.value)}
                  />
                </div>
                <div>
                  <label>Type:</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => setPType(event.target.value)}
                  />
                </div>
                <div>
                  <label>Age:</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => setPAge(event.target.value)}
                  />
                </div>
                <div>
                  <label>Breed:</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => setPBreed(event.target.value)}
                  />
                </div>
                <div>
                  <label>Personality:</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(event) => setPPersonality(event.target.value)}
                  />
                </div>
                <button className="btn btn-dark" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAgency;
