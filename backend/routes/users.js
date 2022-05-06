const { User, validateLogin, validateUser } = require("../models/user");
const {
  Agency,
  validateAgency,
  validateLoginAgency,
} = require("../models/agency");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const bcrypt = require("bcrypt");
const express = require("express");
const { Contact } = require("../models/contact");
const router = express.Router();

//* POST register a new user
router.post("/users/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send(`Email ${req.body.email} already claimed!`);

    const salt = await bcrypt.genSalt(10);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin,
    });

    await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// POST a valid login attempt
// when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/users/loginUser", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password.`);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// Get all users
router.get("/users", [auth], async (req, res) => {
  try {
    console.log(req.user);
    const users = await User.find();
    return res.send(users);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//GET User by Id
router.get("/users/:userId", async (req, res) => {
  try {
    const users = await User.findById(req.params.userId);
    return res.send(users);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE a single user from the database
router.delete("/users/:userId", [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    await user.remove();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//PUT add an about me
router.put("/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    let about = await User.findByIdAndUpdate(req.params.userId, req.body);
    return res.send(about);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//PUT contact information (user)
router.put("/users/:userId/contact", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`Post with Id of ${req.params.userId} does not exist!`);
    user.contact.street = req.body.street;
    user.contact.city = req.body.city;
    user.contact.zip = req.body.zip;
    user.contact.phone = req.body.phone;
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//PUT verification information (user)
router.put("/users/:userId/verification", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`Post with Id of ${req.params.userId} does not exist!`);
    user.verification.employment = req.body.employment;
    user.verification.homeType = req.body.homeType;
    user.verification.homeStatus = req.body.homeStatus;
    user.verification.homeTime = req.body.homeTime;
    user.verification.homeNoise = req.body.homeNoise;
    user.verification.landName = req.body.landName;
    user.verification.landNumber = req.body.landNumber;
    user.verification.aNum = req.body.aNum;
    user.verification.cNum = req.body.cNum;
    user.verification.adoptReason = req.body.adoptReason;
    user.verification.petHours = req.body.petHours;
    user.verification.petLoca = req.body.petLoca;
    user.verification.petSleep = req.body.petSleep;
    user.verification.fence = req.body.fence;
    user.verification.vetName = req.body.vetName;
    user.verification.vetNumber = req.body.vetNumber;
    user.verification.prefTemp = req.body.prefTemp;
    user.verification.petDis = req.body.petDis;
    user.verification.petEn = req.body.petEn;
    user.verification.petIdeal = req.body.petIdeal;
    user.verification.petBadHab = req.body.petBadHab;
    user.verification.agreeOne = req.body.agreeOne;
    user.verification.agreeTwo = req.body.agreeTwo;
    user.verification.agreeThree = req.body.agreeThree;
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//Allow User to Favorite an Agency
router.put("/users/:userId/favorite", async (req, res) => {
  if (req.body.userId !== req.params.userId) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId);
      const agency = await Agency.findById(req.body.agencyId);
      if (!user.favAgency.includes(req.body.agencyId)) {
        await user.updateOne({
          $push: { favAgency: req.body.agencyId },
        });
        res.status(200).send("This agency have been favorited.");
      } else {
        res.status(403).send("You already favorited this agency!");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403)("You cannot favorite yourself!");
  }
});

// DELETE a favorite agency
router.delete("/users/:userId/unfavorite/:requestId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    for (let i = 0; i < user.favAgency.length; i++) {
      if (user.favAgency[i].toString() === req.params.requestId) {
        await user.updateOne({
          $pull: { favAgency: req.params.requestId },
        });
        return res
          .status(200)
          .send("The agency have been removed from the favorite list!");
      }
    }
    return res.status(400).send("This request does not exist");
  } catch (err) {
    res.status(500).send(err);
  }
});

//PUT add a preferred pet
router.put("/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    let about = await User.findByIdAndUpdate(req.params.userId, req.body);
    return res.send(prefPet);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// PUT send a verification request
router.put("/users/:userId/verificationReq/:agencyId", async (req, res) => {
  if (req.params.userId !== req.params.agencyId) {
    try {
      const agency = await Agency.findByIdAndUpdate(req.params.agencyId);
      const user = await User.findById(req.params.userId);
      if (!user.verAgency.includes(req.params.agencyId)) {
        await agency.updateOne({
          $push: { pendingUser: req.params.userId },
        });
        res.status(200).send("Request has been sent.");
      } else {
        res.status(403).send("You already requested verification with this agency!");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403)("You are not an agency!");
  }
});

//AGENCIES

// Get all agencies
router.get("/agency", [auth], async (req, res) => {
  try {
    console.log(req.agency);
    const agency = await Agency.find();
    return res.send(agency);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//* POST register a new user
router.post("/agency/register", async (req, res) => {
  try {
    const { error } = validateAgency(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let agency = await Agency.findOne({ email: req.body.email });
    if (agency)
      return res.status(400).send(`Email ${req.body.email} already claimed!`);

    const salt = await bcrypt.genSalt(10);
    agency = new Agency({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin,
    });

    await agency.save();
    const token = agency.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: agency._id,
        name: agency.name,
        email: agency.email,
        isAdmin: agency.isAdmin,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
