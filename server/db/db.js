const mongoose = require("mongoose");

const uri = process.env.DB_CONNECT_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
  console.log('Database connected:', uri)
});