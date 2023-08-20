import express, { json } from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import router from "./routes";
import Logger from "./config/Logger";
import { validateEnvVariables } from "./config";
import { config } from "dotenv";

config();
const log = new Logger("@src/index").logger;
const startApp = async () => {
  try {
    validateEnvVariables();
    const port = process.env.PORT || 5000;
    connectDB().then();
    const app = express();
    app.use(cors());
    app.use(json());
    app.use(express.urlencoded({ extended: true }));

    app.use(router);

    app
      .listen(port, () => {
        log.info(`Server running on port: ` + port);
      })
      .on("error", (e) => {
        log.error("Server starting failed: " + JSON.stringify(e));
      });
  } catch (e) {
    log.error(e);
  }
};

startApp().then();
