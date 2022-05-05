const mongoose = require("mongoose")
const Joi = require("joi");


const agencyAboutSchema = new mongoose.Schema({
    aboutAgency: {type: String, minLength: 4},
    goals: {type: String, minLength: 4},
    typePet: {type: String, minLength: 2},
    fees: {type: Number, minLength: 1},
});

const AgencyAbout = mongoose.model("AgencyAbout", agencyAboutSchema);
function validateAgencyAbout(agencyAbout) {
    const schema = Joi.object({
        street: Joi.string().min(4).required(),
        city: Joi.string().min(4).required(),
        zip: Joi.number().min(5).required(),
        phone: Joi.number().min(10).required()
    });
    return schema.validate(agencyAbout);
}

module.exports = {
    agencyAboutSchema,
    AgencyAbout,
    validateAgencyAbout,
};
