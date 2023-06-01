import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//define API key
const API_KEY = process.env.API_KEY;

const checkApiKey = (req, res, next) => {
  const apiKey = req.query.api_key;
  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(401).send("Invalid API key");
  }
};

// parse application/json
app.use(bodyParser.json());

//parse the cookie, so it can catch the cookie
app.use(cookieParser());

//accepting json request
app.use(express.json());

//applying api key use
app.use(checkApiKey);

//applying cors
app.use(cors());

//middleware all endpoint routes
app.use(router);

//middleware to enable access of the uploads folder
app.use("/uploads", express.static("uploads"));

//server listener
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on express...");
});
