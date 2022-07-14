import express from "express";
import cors from "cors";
import indexRouter from "./data/routes/index";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
import { auth } from "express-oauth2-jwt-bearer";

// create middleware for checking the JWT
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

app.use("/", checkJwt, indexRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`⚡️Server is running at https://localhost:${PORT}`);
});
