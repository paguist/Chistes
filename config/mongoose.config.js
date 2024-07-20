const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/jokes")
  .then(() => {
    console.log("Conexion exitosa con MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });