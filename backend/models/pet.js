const mongoose = require("mongoose")
const Joi = require("joi");


const petSchema = new mongoose.Schema({
    image: { type: String, default: ""},
    name: {type: String, minLength: 1},
    type: {type: String, minLength: 1},
    age: {type: String, minLength: 1},
    breed: {type: String, minLength: 1},
    personality: {type: String, minLength: 1},
});

const Pet = mongoose.model("Pet", petSchema);
function validatePet(pet) {
    const schema = Joi.object({
        image: Joi.string(),
        name: Joi.string().min(1),
        type: Joi.string().min(1),
        age: Joi.string().min(1),
        breed: Joi.string().min(1),
        personality: Joi.string().min(1),
    });
    return schema.validate(pet);
}

module.exports = {
    petSchema,
    Pet,
    validatePet,
};
