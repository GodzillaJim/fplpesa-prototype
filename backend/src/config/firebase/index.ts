import { initializeApp, FirebaseOptions } from "firebase/app";
import config from "../index";
import admin from "firebase-admin";
import Logger from "../Logger";

const log = new Logger("Firebase").logger;
const firebaseConfig: FirebaseOptions = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID,
  measurementId: config.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
log.info("Initialized app: " + app.name);
export const firebaseAuth = admin.initializeApp({ ...firebaseConfig }).auth();
export default app;
