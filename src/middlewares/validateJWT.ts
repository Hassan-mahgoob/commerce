import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import type { ExtendedRequest } from "../types/extendedRequest.js";

const validateJWT = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).send("Authorization header is required");
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token is required");
  }
  jwt.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    if (!payload) {
      return res.status(401).send("Invalid token payload");
    }
    const userPayload = payload as { email: string };
    const user = await userModel.findOne({ email: userPayload.email });
    req.user = user;
    next();
  });
};

export default validateJWT;
