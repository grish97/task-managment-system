const User = require("../models/user.js");

async function read(req, res) {
    try {
        const user = await User.find();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

module.exports = {
    read,
};