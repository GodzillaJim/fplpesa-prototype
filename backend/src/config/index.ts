import { config } from "dotenv";
import Logger from "./Logger";

config();
const log = new Logger("@src/config/index").logger;
export type ConfigType = {
  PORT?: string;
  MONGO_URI?: string;
  FIREBASE_PROJECT_ID?: string;
  FIREBASE_PRIVATE_KEY?: string;
  FIREBASE_PRIVATE_KEY_ID?: string;
  FIREBASE_CLIENT_EMAIL?: string;
  FIREBASE_CLIENT_ID?: string;
  FIREBASE_AUTH_URI?: string;
  FIREBASE_TOKEN_URI?: string;
  FIREBASE_AUTH_CERT_URL?: string;
  FIREBASE_CLIENT_CERT_URL?: string;
  API_KEY?: string;
  AUTH_DOMAIN?: string;
  PROJECT_ID?: string;
  STORAGE_BUCKET?: string;
  MESSAGING_SENDER_ID?: string;
  APP_ID?: string;
  MEASUREMENT_ID?: string;
};

const envVariables: ConfigType = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  API_KEY: process.env.API_KEY,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  PROJECT_ID: process.env.PROJECT_ID,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
  APP_ID: process.env.APP_ID,
  MEASUREMENT_ID: process.env.MEASUREMENT_ID,
};

export const validateEnvVariables = () => {
  log.info(`Checking required .env variables`);
  const config: { [key: string]: string | undefined } = envVariables;
  for (const key in config) {
    if (!config[key]) {
      log.error(`Please provide this value in the .env : "${key}"`);
      throw new Error(`${key} value not provided`);
    }
  }
  log.info(`ENV. variables check complete`);
};

export default envVariables;
