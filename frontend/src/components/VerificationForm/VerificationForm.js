import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import NavbarUser from "../NavBar/NavBarUser";

const VerFormUser = () => {
  const { user } = useContext(AuthContext);
  const [ver, setVer] = useState("");
  const [em, setEm] = useState("");
  const [hT, setHT] = useState();
  const [hS, setHS] = useState("");
  const [hN, setHN] = useState("");
  const [lN, setLN] = useState("");
  const [lNu, setLNu] = useState();
  const [aNum, setANum] = useState();
  const [cNum, setCNum] = useState();
  const [aR, setAR] = useState("");
  const [pH, setPH] = useState("");
  const [pL, setPL] = useState("");
  const [pS, setPS] = useState("");
  const [fence, setFence] = useState("");
  const [vN, setVN] = useState("");
  const [vNum, setVNum] = useState();
  const [prefT, setPrefT] = useState("");
  const [pD, setPD] = useState("");
  const [pE, setPE] = useState("");
  const [pI, setPI] = useState("");
  const [pB, setPB] = useState("");
  const [agOne, setAgOne] = useState();
  const [agTwo, setAgTwo] = useState();
  const [agThree, setAgThree] = useState();
  const jwt = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${jwt}` } };

  async function getUserVerInfo() {
    let userInfo = await axios.get(
      `http://localhost:3011/api/users/${user._id}`
    );
    console.log(userInfo.data);
    setVer(userInfo.data.verification);
  }
  async function handleSubmitVerification(event) {
    event.preventDefault();
    let newVer = {
      employment: em,
      homeType: hT,
      homeStatus: hS,
      homeTime: hT,
      homeNoise: hN,
      landName: lN,
      landNumber: lNu,
      aNum: aNum,
      cNum: cNum,
      adoptReason: aR,
      petHours: pH,
      petLoca: pL,
      petSleep: pS,
      fence: fence,
      vetName: vN,
      vetNumber: vNum,
      prefTemp: prefT,
      petDis: pD,
      petEn: pE,
      petIdeal: pI,
      petBadHab: pB,
      agreeOne: agOne,
      agreeTwo: agTwo,
      agreeThree: agThree,
    };
    console.log(newVer);
    await axios.put(
      `http://localhost:3011/api/users/${user._id}/verification`,
      newVer
    );
    getUserVerInfo();
  }

  useEffect(() => {
    getUserVerInfo();
  }, []);

  return (
    <div>
      <NavbarUser />
      <div>
        <div className="row">
          <div className="col-md-6 border">
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
                <tr>
                  <th>Ideals</th>
                  <td>{ver.petIdeal}</td>
                </tr>
                <tr>
                  <th>Untolerable Habits</th>
                  <td>{ver.petBadHab}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6 border">
            <h2>Update Verification Information:</h2>
            <form
              className="form"
              id="Verification"
              onSubmit={(event) => handleSubmitVerification(event)}
            >
              <label>Place of Employment: </label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setEm(event.target.value)}
              />
              <label>Do you currently own, rent, or lease:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setHS(event.target.value)}
              />
              <label>How long have you lived at your current residence?</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setHT(event.target.value)}
              />
              <label>The noise/activity in my home is usually:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setHN(event.target.value)}
              />
              className="form-control"
              <label>Name of Landlord if applicable:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setLN(event.target.value)}
              />
              <label>Number of Landlord if applicable:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setLNu(event.target.value)}
              />
              <label>Number of Adults in Home:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setANum(event.target.value)}
              />
              <label>Number of Children in Home:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setCNum(event.target.value)}
              />
              <label>Reason for Adoption:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setAR(event.target.value)}
              />
              <label>How long will the dog be left alone each day?:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setPH(event.target.value)}
              />
              <label>Where will the dog be kept when no one is home?:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setPL(event.target.value)}
              />
              <label>Where will the dog be kept at night?:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setPS(event.target.value)}
              />
              <label>Do you have a fenced yard?:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setFence(event.target.value)}
              />
              <label>Please list the Veterinarian you will be using:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setVN(event.target.value)}
              />
              <label>Please list the Veterinarian's number:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setVNum(event.target.value)}
              />
              <label>Please describe your preferred pet:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setPrefT(event.target.value)}
              />
              <label>Please describe what you would dislike in a pet:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setPD(event.target.value)}
              />
              <label>
                Please describe what activity level you would like in a pet:
              </label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setPE(event.target.value)}
              />
              <label>Please describe what you would like in a pet:</label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setPI(event.target.value)}
              />
              <label>
                Please describe what bad habits you would not be able to
                tolerate in a pet:
              </label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setPB(event.target.value)}
              />
              <label>
                I understand and agree that fĕch makes no express or implied
                warranty, representation or promise to the age, health, breed,
                habits, disposition or safety of the animal. I hereby accept the
                animal as is, assume all risks and responsibilities associated
                with the ownership of the Animal, including bites, and I hereby
                fully and completely release, indemnify and hold harmless Rescue
                A Dog, Inc., its directors, officers, volunteers, servants, and
                employees from any claim, cause of action or liability of any
                sort or nature, whether known or unknown, directly or indirectly
                arising out of or in connection with the adoption, care or
                ownership, maintenance, temperament or condition of the Animal.
                Please Initial
              </label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setAgOne(event.target.value)}
              ></input>
              <label>
                I agree in the case I cannot keep the animal, they will be
                returned to their respective adoptive agency. All monies
                deposited will be considered a donation to the rescue and are
                non-refundable. Please Initial
              </label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setAgTwo(event.target.value)}
              ></input>
              <label>
                I acknowledge falsification of the above can result in my being
                denied adoption of an animal or if animal has been adopted to
                me, the return of that animal to the respective adoption agency.
                I certify that the above information is true and correct to the
                best of my knowledge. Please Initial
              </label>
              <input
                className="form-control"
                type="text"
                onChange={(event) => setAgThree(event.target.value)}
              ></input>
              <button className="btn btn-dark" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerFormUser;
