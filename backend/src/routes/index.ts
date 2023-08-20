import { Router } from "express";
import Logger from "../config/Logger";

const router = Router();
const log = new Logger("@src/routes/index").logger;
router.get("/api/v1/", (req, res) => {
  log.info("Health check: ", req.headers.from);
  res.send("ok");
});

export default router;
