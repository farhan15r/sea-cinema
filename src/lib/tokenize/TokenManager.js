import jwt from "jsonwebtoken";
import AuthenticationError from "../exceptions/AuthenticationError";

const TokenManager = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_AGE,
    });
  },

  generateRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: process.env.REFRESH_TOKEN_AGE,
    });
  },

  verifyRefreshToken: (token) => {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new AuthenticationError("Invalid refresh token");
    }
  },

  verifyAccessToken: (token) => {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    } catch (error) {
      throw new AuthenticationError("Invalid access token");
    }
  },

  getTokenFromHeaders: (headers) => {
    const Bearer = headers.get("Authorization");

    if (!Bearer) throw new AuthenticationError("Missing authorization header");

    const token = Bearer.split(" ")[1];

    return token;
  },
};

export default TokenManager;
