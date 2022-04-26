const mongoose = require("mongoose");

const uri = "mongodb+srv://grish01:searchEngine@cluster0.ae1qx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});