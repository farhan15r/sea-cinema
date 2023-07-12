import axios from "axios";
import tokenUtils from "./tokenUtils";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    if (tokenUtils.isAccessTokenExpired()) {
      try {
        const { data } = await axios.put("/api/auth", {
          refreshToken: tokenUtils.getRefreshToken(),
        });
        tokenUtils.setAccessToken(data.accessToken);
      } catch (error) {
        tokenUtils.removeTokens();
        window.location = "/login?expired=true";
      }
    }

    config.headers["Authorization"] = `Bearer ${tokenUtils.getAccessToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosJWT;
