import express from "express";
import cors from "cors";

const app = express();
import bodyParser from "body-parser";
app.use(bodyParser.json());
import dotenv from "dotenv";
dotenv.config();
import { testRouter } from "./routes/testRoute.js";
import authRouter from "./routes/authRoute.js";
import commonRouter from "./routes/commonRoute.js";
import ngoRouter from "./routes/ngoRoute.js";
import userRouter from "./routes/userRoute.js";
import isAuthenticated from "./middleware/isAuth.js";

app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});
app.get("/favicon.png", (req, res) => {
  res.status(204).end();
});
//!!!TESTING!!!
app.use("/test", testRouter);

app.use(isAuthenticated);

app.use("/auth", authRouter);
app.use("/common", commonRouter);
app.use("/user", userRouter);
app.use("/ngo", ngoRouter);

//Favicon error fix

app.listen(5100, () => {
  console.log(`Server started at http://localhost:5100`);
});
