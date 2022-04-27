const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/dogsDB";
console.log(process.env.TOKEN_SECRET);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
  console.log('Database connected:', uri)
})