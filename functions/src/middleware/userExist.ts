import { Request, Response, NextFunction } from "express";

import { ResourceExistError } from "../error";
import { db } from "../utils/admin";

const adminRef = db.collection("Admins");

export default async function userExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email }: any = req.body;

  try {
    const snapshot = await adminRef.where("email", "==", email).get();

    if (snapshot && !snapshot.empty) {
      throw ResourceExistError("User");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
