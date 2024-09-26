const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const sensorModel = require("../models/sensorModel");
const app = express();

// Connect to the database
mongoose.connect('mongodb://127.0.0.1/ESP32', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.get("/", async (req, res) => {
  const now = new Date();
  const yesterday = new Date(now - 24 * 60 * 60 * 1000);

  try {
    // Query the sensor data for the last 24 hours
    const data = await sensorModel.find({
      timestamp: { $gte: yesterday, $lte: now },
    });
    console.log(data);
    // Send the sensor data as a response
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async function (req, res, next) 
{  console.log("req.body: ", req.body);
   try {
     const productInstance = new sensorModel({
       Temperature: req.body.Temperature,
       Humidity: req.body.Humidity,
       Light: req.body.Humidity,
      
     });
     const saveResult = await productInstance.save();
     res.status(201).json(saveResult);
   } catch (error) {
     res.status(500).json(error);
   }
});


module.exports = router;