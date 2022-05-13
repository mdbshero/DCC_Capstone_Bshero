const mongoose = require("mongoose")
const Joi = require("joi");



const verificationSchema = new mongoose.Schema({
    employment: {type: String, minLength: 1, required: true, default: "    " },
    homeType: {type: String, minLength: 1, required: true, default: "     " },
    homeStatus: {type: String, minLength: 1, required: true, default: "      " },
    homeTime: {type: Number, minLength: 1, required: true, default: 0 },
    homeNoise: {type: String, minLength: 3, required: true, default: "    " },
    landName: {type: String, minLength: 4, default: "     "},
    landNumber: {type: Number, minLength: 10, default: 0},
    aNum: {type: Number, minLength: 1, required: true, default: 0 },
    cNum: {type: Number, minLength: 1, required: true, default: 0 },
    adoptReason: {type: String, minLength: 3, required: true, default: "     " },
    petHours: {type: Number, minLength: 1, required: true, default: "     " },
    petLoca: {type: String, minLength: 1, required: true, default: "     " },
    petSleep: {type: String, minLength: 3, required: true, default: "     " },
    fence: {type: String, required: true, default: " " },
    vetName: {type: String, minLength: 4, default: "     "},
    vetNumber: {type: Number, minLength: 10, default: 0}, 
    prefTemp: {type: String, minLength: 3, required: true, default: "     " },
    petDis: {type: String, minLength: 3, required: true, default: "     " },
    petEn: {type: String, minLength: 3, required: true, default: "     " },
    petIdeal: {type: String, minLength: 3, required: true, default: "     " },
    petBadHab: {type: String, minLength: 3, required: true, default: "     " },
    agreeOne: {type: String, required: true, default: " " },
    agreeTwo: {type: String, required: true, default: " " },
    agreeThree: {type: String, required: true, default: " " },
});

const Verification = mongoose.model("Verification", verificationSchema);
function validateVerification(verification) {
    const schema = Joi.object({
        employment: Joi.string().min(1).required(),
        homeType: Joi.string().min(1).required(),
        homeStatus: Joi.string().min(1).required(),
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
        fence: Joi.string().required(),
        vetName: Joi.string().min(4),
        vetNumber: Joi.number().min(4), 
        prefTemp: Joi.string().min(4).required(),
        petDis: Joi.string().min(4).required(),
        petEn: Joi.string().min(4).required(),
        petIdeal: Joi.string().min(4).required(),
        petBadHab: Joi.string().min(4).required(),
        agreeOne: Joi.string().required(),
        agreeTwo: Joi.string().required(),
        agreeThree: Joi.string().required(),
    });
    return schema.validate(verification);
}

module.exports = {
    verificationSchema,
    Verification,
    validateVerification,
};
