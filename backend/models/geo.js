const mongoose = require("mongoose")
const Joi = require("joi");


const geoSchema = new mongoose.Schema({
    country: {type: String, minLength: 2},
    regionName: {type: String, minLength: 2},
    city: {type: String, minLength: 2},
    zip: {type: Number, minLength: 5},
});

const Geo = mongoose.model("Geo", geoSchema);
function validateGeo(geo) {
    const schema = Joi.object({
        country: Joi.string().min(2),
        regionName: Joi.string().min(2),
        city: Joi.string().min(2),
        zip: Joi.number().min(5),
    });
    return schema.validate(geo);
}

module.exports = {
    geoSchema,
    Geo,
    validateGeo,
};
