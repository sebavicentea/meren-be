import express from "express";
import "express-async-errors";
import { json } from "body-parser";
const cors = require("cors");
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
} from "@sebavicentea_org/common";
import { createContributorRouter } from "./routes/campaign/new";
import { campaignRouter } from "./routes/campaign";

const corsOptions = {
  credentials: true,
  origin: process.env.CORS_ORIGIN
};

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cors(corsOptions));
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'prod',
    overwrite: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 //a week
  })
);

app.use(campaignRouter);
app.use(createContributorRouter)


app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
