const mongoose = require("mongoose");
mongoose.set('strictQuery', true);  

const sensorSchema = mongoose.Schema({
    Temperature: {type: Number},
    Humidity: {type: Number},
    Light:{type: Number},
});

module.exports = mongoose.model("Sensor", sensorSchema);
