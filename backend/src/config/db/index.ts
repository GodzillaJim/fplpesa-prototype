import * as mongoose from "mongoose";
import { config } from "dotenv";
import Logger from "../Logger";
import env from "..";

config();
const log = new Logger("@src/config/db/index").logger;
export const connectDB = async () => {
  const uri = env.MONGO_URI;
  try {
    if (!uri) {
      log.error("Please provide a MONGO_URI in .env");
      return;
    }
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    log.info(`Database connection successful!`);
  } catch (e) {
    log.error("DB connection failed!", e);
  }
};
