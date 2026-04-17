import express from "express";
import cors from "cors";
import router from "./routes/api.js";
import connect from "./utils/database.js";
import mongoose from "mongoose";
import { PORT } from "./utils/env.js";

const app = express();
const port = PORT;

async function init() {
  await connect();
  if (mongoose.connection.readyState === 1) {
    console.log("Database connected");
  } else {
    console.log("Database not connected");
  }

  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }),
  );

  app.use(express.json());
  app.use("/api", router);
  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "  Server is running!",
      data: null,
    });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
