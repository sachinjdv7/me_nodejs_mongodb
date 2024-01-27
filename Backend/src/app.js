const express = require("express");
const routes = require("./routes/v1");
const mongoose = require("mongoose");
const captureDateMiddleware = require("./middleware/middleware");
const cors = require("cors");
const config = require("./config/config");

const app = express();

app.use(cors());
app.use(express.json());

// NOTE - Uncomment in Milestone 5
// Middleware to log API request metadata
// app.use(captureDateMiddleware);

app.use("/v1", routes);

// TODO - Create a MongoDB connection using Mongoose
const connectMongoDB = async () => {
  try {
    const connectionInsance = await mongoose.connect(config.mongoose.url);
    console.log(connectionInsance);
    console.log(`🚀 MongoDB is connnected`);
  } catch (error) {
    console.log(`MongoDB connection failed`, error);
  }
};
// Start the Node server
connectMongoDB()
  .then(() => {
    app.on("error", () => {
      console.log(`Express server is getting failed while connected`, error);
    });
    app.listen(config.port, () => {
      console.log(`App is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed !!!, ${error}`);
  });
