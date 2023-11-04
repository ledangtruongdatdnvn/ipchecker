import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import testRoutes from "./routes/test.routes.js";

import constants from "./constants/index.js";
import "./auth/passport.js";

import bodyParser from "body-parser";
const app = express();
import OpenAI from "openai";

/* OPEN AI CONFIGURATION */
const configuration = {
  apiKey: process.env.OPEN_API_KEY,
};
export const openai = new OpenAI(configuration);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());

// var corsOptions = {
//   origin: `${constants.APP_URL}:${constants.PORT}`,
// };
// app.use(cors(corsOptions));

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(`${constants.API_VERSION}/user`, userRoutes);

app.use(`${constants.API_VERSION}/test`, testRoutes);

export default app;
