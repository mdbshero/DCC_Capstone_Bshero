const mongoose = require("mongoose")
const Joi = require("joi");


const petSchema = new mongoose.Schema({
    type: {type: String, minLength: 1},
    age: {type: Number, minLength: 1},
    breed: {type: String, minLength: 1},
    personality: {type: String, minLength: 1},
});

const Pet = mongoose.model("Pet", petSchema);
function validatePet(pet) {
    const schema = Joi.object({
        street: Joi.string().min(4).required(),
        city: Joi.string().min(4).required(),
        zip: Joi.number().min(5).required(),
        phone: Joi.number().min(10).required()
    });
    return schema.validate(pet);
}

module.exports = {
    petSchema,
    Pet,
    validatePet,
};
