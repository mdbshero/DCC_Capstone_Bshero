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
        aboutAgency: Joi.string().min(4).required(),
        goals: Joi.string().min(4).required(),
        typePet: Joi.number().min(5).required(),
        fees: Joi.number().min(10).required()
    });
    return schema.validate(agencyAbout);
}

module.exports = {
    agencyAboutSchema,
    AgencyAbout,
    validateAgencyAbout,
};
