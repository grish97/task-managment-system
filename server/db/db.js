const { Console } = require("console");
const mongoose = require("mongoose");

const uri = process.env.DB_CONNECT_URI;
console.log(process.env.TOKEN_SECRET);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});