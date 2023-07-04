import jwt from "jsonwebtoken";
import AuthenticationError from "../exceptions/AuthenticationError";

const TokenManager = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, "asdasdasdasdasdasdasdasdasdasd", { expiresIn: "15d" });
  },

  generateRefreshToken: (payload) => {
    return jwt.sign(payload, "asdasdasdasdasdasdasdasdasdasd", { expiresIn: "7d" });
  },

  verifyAccessToken: (token) => {
    try {
      return jwt.verify(token, "asdasdasdasdasdasdasdasdasdasd");
    } catch (error) {
      throw new AuthenticationError("Invalid access token");
    }
  },

  getTokenFromHeaders: (headers) => {
    const Bearer = headers.get("Authorization");

    if(!Bearer) throw new AuthenticationError("Missing authorization header")

    const token = Bearer.split(" ")[1];

    return token;
  }
};

export default TokenManager;