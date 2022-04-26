const bcript = require("bcryptjs");
const Joi = require("@hapi/joi");
const User = require("../models/user.js");

// validate user info
// const reqisterSchema = Joi.object({
//     username: Joi.string().min(3).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required(),
// });

async function register(req, res) {
    const isAlreadyExist = await User.findOne({ email: req.body.email });

    if (isAlreadyExist) {
        res.status(400).send("User with this email already exists");
        return;
    }

    const salt = bcript.genSalt(10);
    const hashedPassword = bcript.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        // const { error } = reqisterSchema.validateAsync(req.body);
        const error = false;

        if (error) {
            res.status(400).json(error.details[0].message);
            return;
        } else {
            const savedUser = await user.save();
            res.status(200).json(savedUser);
        }
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

module.exports = {
    register,
};