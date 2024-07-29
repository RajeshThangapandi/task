const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const dataSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
});

dataSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};

const Data = mongoose.model("Data", dataSchema);

const validate = (data) => {
    const schema = Joi.object({
        id: Joi.number().required().label("ID"),
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        phone: Joi.string().required().label("Phone"),
    });
    return schema.validate(data);
};

module.exports = { Data, validate };
