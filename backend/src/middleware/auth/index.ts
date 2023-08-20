import { Request, Response, NextFunction } from "express";
import authManager from "../../services/auth";

export const validateAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).send("Please provide a bearer token");
    }
    const user = await authManager.verifyToken(token);
    if (!user) {
      return res.status(404).send("Invalid token, login again");
    }
    req.app.locals["user"] = user;
    next();

    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};
