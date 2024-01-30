import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";

const app = express(); //Init the backend
dotenv.config(); //To be able to use enviropment variables along the app

const connect = async () => {
  try {
    //Attempting to connect to MongoDB using mongoose
    mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }
};

//Event triggered when the database disconnects
mongoose.connection.on("disconnect", () => {
  console.log("MongoDB Disconnected");
});

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//USE THE ROUTES CREATED
//The first argument is the url route, and the second one is the route element
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//ERROS HANDLING
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//Starts the server on port 8000 and connect to the database when it's done
app.listen("8000", () => {
  connect();
  console.log("Connected to backend");
});
