// Include mongoose into the working state
const mongoose = require("mongoose");

// It is the ouor monouri which will connect us to mongodb
const mongoURI =
  "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
  
// mongoose.connect take two arguments one is mongouri and second is fireback function
// it connect us to mongodb using mongoose
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected To Mongoose");
  });
};
module.exports = connectToMongo;
