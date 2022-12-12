import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../../environment";

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    jwt.verify(
      req.cookies["auth-token"]?.split(" ")[1],
      env.JWT_SECRET as string
    );
    next();
  } catch {
    res.redirect("/login");
  }
}
