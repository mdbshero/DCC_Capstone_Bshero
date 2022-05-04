const mongoose = require("mongoose")
const Joi = require("joi");


const contactSchema = new mongoose.Schema({
    street: {type: String, minLength: 4},
    city: {type: String, minLength: 4},
    zip: {type: Number, minLength: 5},
    phone: {type: Number, minLength: 10},
});

const Contact = mongoose.model("Contact", contactSchema);
function validateContact(contact) {
    const schema = Joi.object({
        street: Joi.string().min(4).required(),
        city: Joi.string().min(4).required(),
        zip: Joi.number().min(5).required(),
        phone: Joi.number().min(10).required()
    });
    return schema.validate(contact);
}

module.exports = {
    contactSchema,
    Contact,
    validateContact,
};
