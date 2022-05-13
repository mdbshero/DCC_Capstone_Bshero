const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { contactSchema } = require("./contact");
const { agencyAboutSchema } = require("./agencyAbout");
const { petSchema } = require("./pet");
const { geoSchema } = require("./geo");

const agencySchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  password: { type: String, required: true, minLength: 8, maxLength: 1024 },
  contact: { type: contactSchema, default: {} },
  about: { type: agencyAboutSchema, default: {}},
  pets: [{type: petSchema}],
  prefUser: { type: String, minLength: 4, maxLength: 1024 },
  verUser: [{ type: mongoose.Types.ObjectId }],
  pendingUser: [{ type: mongoose.Types.ObjectId }],
  isAdmin: { type: Boolean, required: true },
  image: { type: String, default: ""},
  geo: {type: geoSchema, default: {}}
});

agencySchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
      image: this.image
    },
    process.env.JWT_SECRET
  );
};

const validateAgency = (agency) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    isAdmin: Joi.bool().required(),
    image: Joi.string()
  });
  return schema.validate(agency);
};

const validateLoginAgency = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};

const Agency = mongoose.model("Agency", agencySchema);
module.exports.Agency = Agency;
module.exports.agencySchema = agencySchema;
module.exports.validateAgency = validateAgency;
module.exports.validateLoginAgency = validateLoginAgency;
