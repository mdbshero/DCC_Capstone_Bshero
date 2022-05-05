const mongoose = require("mongoose")
const Joi = require("joi");



const verificationSchema = new mongoose.Schema({
    employment: {type: String, minLength: 4, required: true },
    homeType: {type: String, minLength: 4, required: true },
    homeStatus: {type: String, minLength: 5, required: true },
    homeTime: {type: Number, minLength: 1, required: true },
    homeNoise: {type: String, minLength: 3, required: true },
    landName: {type: String, minLength: 4},
    landNumber: {type: Number, minLength: 10},
    aNum: {type: Number, minLength: 1, required: true },
    cNum: {type: Number, minLength: 1, required: true },
    adoptReason: {type: String, minLength: 3, required: true },
    petHours: {type: Number, minLength: 1, required: true },
    petLoca: {type: String, minLength: 1, required: true },
    petSleep: {type: String, minLength: 3, required: true },
    fence: {type: Boolean, required: true },
    vetName: {type: String, minLength: 4, default: " "},
    vetNumber: {type: Number, minLength: 10, default: " "}, 
    prefTemp: {type: String, minLength: 3, required: true },
    petDis: {type: String, minLength: 3, required: true },
    petEn: {type: String, minLength: 3, required: true },
    petIdeal: {type: String, minLength: 3, required: true },
    petBadHab: {type: String, minLength: 3, required: true },
    agreeOne: {type: Boolean, required: true },
    agreeTwo: {type: Boolean, required: true },
    agreeThree: {type: Boolean, required: true },
});

const Verification = mongoose.model("Verification", verificationSchema);
function validateVerification(verification) {
    const schema = Joi.object({
        employment: Joi.string().min(4).required(),
        homeType: Joi.string().min(4).required(),
        homeStatus: Joi.string().min(5).required(),
        homeTime: Joi.number().min(1).required(),
        homeNoise: Joi.string().min(3).required(),
        landName: Joi.string().min(3),
        landNumber: Joi.number().min(10),
        aNum: Joi.number().min(1).required(),
        cNum: Joi.number().min(1).required(),
        adoptReason: Joi.string().min(4).required(),
        petHours: Joi.number().min(1).required(),
        petLoca: Joi.string().min(4).required(),
        petSleep: Joi.string().min(4).required(),
        fence: Joi.boolean().required(),
        vetName: Joi.string().min(4),
        vetNumber: Joi.number().min(4), 
        prefTemp: Joi.string().min(4).required(),
        petDis: Joi.string().min(4).required(),
        petEn: Joi.string().min(4).required(),
        petIdeal: Joi.string().min(4).required(),
        petBadHab: Joi.string().min(4).required(),
        agreeOne: Joi.boolean().required(),
        agreeTwo: Joi.boolean().required(),
        agreeThree: Joi.boolean().required(),
    });
    return schema.validate(verification);
}

module.exports = {
    verificationSchema,
    Verification,
    validateVerification,
};
