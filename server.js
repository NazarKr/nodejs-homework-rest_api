const mongoose = require("mongoose");

require("dotenv").config();

const app = require('./app')

const { DB_HOST, PORT = 3001 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT , () => {
      console.log("Server running. Use our API on port: 3001");
    })
  )
  .catch((error) => console.log(error.message));
