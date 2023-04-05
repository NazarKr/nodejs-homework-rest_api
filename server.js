const mongoose = require("mongoose");

const app = require('./app')

const DB_HOST =
  "mongodb+srv://NazarKr:i04021990@cluster0.4hu99yv.mongodb.net/contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
  .then(() =>
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  }))
  .catch(error => console.log(error.message)
);


