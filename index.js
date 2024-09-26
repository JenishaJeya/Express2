const express = require("express");
const app = express();
const morgan = require("morgan");
const Sensors = require("./routes/Sensors");
const sensorModel = require("./models/sensorModel");
const cors = require("cors");


const HOST = process.env.HOST || "mongodb://127.0.0.1/ESP32"; 
const PORT = process.env.PORT || 3001;

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(HOST)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Error:", error));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/products", Sensors); 

app.get("/", function (req, res) {
  // Provide a basic HTML page on the root of the server
  res.write("<!DOCTYPE html>");
  res.write("<html style='font-family: Roboto, Arial, sans-serif;'>");
  res.write("<head><title>REST API</title></head>");
  res.write("<body><p>/products is implemented</p></body>");
  res.write("</html>");
  res.end();
});

async function checkForDataInDatabase() {
  const products = await sensorModel.find();
  // If nothing in the database, let's just add some?
  if (products.length == 0) {
    const productInstance1 = new sensorModel({
      Temperature: 32,
      Humidity: 14,
      Light: 23,
    });
    const productInstance2 = new sensorModel({
      Temperature: 35,
      Humidity: 23,
      Moisture: 21,
    });
    const productInstance3 = new sensorModel({
      Temperature: 35,
      Humidity: 21,
      Light: 24,
    });
    const productInstance4 = new sensorModel({
      Temperature: 36,
      Humidity: 22,
      Light: 29,
    });
    const productInstance5 = new sensorModel({
      Temperature: 36,
      Humidity: 23,
      Light: 26,
    });
    const productInstance6 = new sensorModel({
      Temperature: 43,
      Humidity: 15,
      Light: 29, 
    });
    const productInstance7 = new sensorModel({
      Temperature: 34,
      Humidity: 25,
      Light: 22,
    });
    const productInstance8 = new sensorModel({
      Temperature: 27,
      Humidity: 14,
      Light: 29,
    });
    const productInstance9 = new sensorModel({
      Temperature: 25,
      Humidity: 20,
      Light: 21,
    });
    const productInstance10 = new sensorModel({
      Temperature: 26,
      Humidity: 24,
      Light: 23,
    });
    const productInstance11 = new sensorModel({
      Temperature: 38,
      Humidity: 32,
      Light: 36,
    });
    const productInstance12 = new sensorModel({
      Temperature: 37,
      Humidity: 24,
      Light: 31, 
    });
    const productInstance13 = new sensorModel({
      Temperature: 36,
      Humidity: 25,
      Light: 32,
    });
    const productInstance14 = new sensorModel({
      Temperature: 35,
      Humidity: 25,
      Light: 34,
    });
    const productInstance15 = new sensorModel({
      Temperature: 44,
      Humidity: 32,
      Light: 22,
    });
    await productInstance1.save();
    await productInstance2.save();
    await productInstance3.save();
    await productInstance4.save();
    await productInstance5.save();
    await productInstance6.save();
    await productInstance7.save();
    await productInstance8.save();
    await productInstance9.save();
    await productInstance10.save();
    await productInstance11.save();
    await productInstance12.save();
    await productInstance13.save();
    await productInstance14.save();
    await productInstance15.save();
    console.log("Added 15 products since the database was empty!");
  } else {
    console.log("products", products.length);
  }
}
checkForDataInDatabase();

app.listen(PORT);