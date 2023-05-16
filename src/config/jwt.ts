import jwt from "jsonwebtoken";
import httpError from "http-errors";

const privateKey = process.env.KWT_PRIVATE_KEY as string;

export const generateToken = async (payload: { [key: string]: any }) =>
  jwt.sign(payload, privateKey, { expiresIn: "365d" });

export const validateJwt = async (token: string) => {
  try {
    const content = jwt.verify(token, privateKey);
    return content as  { [key: string]: any };
  } catch (e) {
   throw new httpError.Unauthorized("Please provide a valid token");
  }
};
