import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./common/common.config";
import { sendDailySummary } from "./util/cronJob";
import errorHandlerMiddleware from "./error/error.middleware";
import "express-async-errors";
import NotFoundError from "./error/error.classes/NotFoundError";
import requestMappings from "./mapping";

const app: Express = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"], // Include the PATCH method here
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(express.json());

//api router Mappings
requestMappings(app);

//error handler middleware
app.use(errorHandlerMiddleware);

//404 not found route
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError("API endpoint not found!");
});

//setup cron jobs
sendDailySummary();

const start = async () => {
  const port = process.env.PORT || 5000;
  try {
    app.listen(port, () => {
      console.log(`SERVER IS LISTENING ON PORT ${port}..!`);
      connectDB();
    });
  } catch (e) {
    console.log(e);
  }
};

start();
