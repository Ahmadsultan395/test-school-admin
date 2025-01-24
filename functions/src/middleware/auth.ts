import { NextFunction, Request, Response } from "express";
import responseFormatter from "../utils/responseFormatter";
import { admin } from "../utils/admin";

export const ensureApiAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  try {
    if (!bearerHeader) {
      throw new Error("Authorization token does not exists in request.");
    }

    const bearertoken = bearerHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(bearertoken);

    console.info("decoded token: ", decodedToken);
    (req as any).userInfo = decodedToken;
    return next();
  } catch (error) {
    const err = error as Error;
    console.error("auth middleware error: ", error);
    const response = responseFormatter(req.originalUrl, {
      code: 403,
      message: err.message,
    });
    return res.status(403).json(response);
  }
};
