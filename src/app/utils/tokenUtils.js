import jwtDecode from "jwt-decode";

const tokenUtils = {
  isLogin: () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      return false;
    }
    return true;
  },

  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },

  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
  },

  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },

  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },

  getUsername: () => {
    const decode = jwtDecode(tokenUtils.getAccessToken());
    return decode.username;
  },

  removeTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  isAccessTokenExpired: () => {
    const accessToken = tokenUtils.getAccessToken();
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    const exp = decoded.exp - 60;

    if (exp < currentTime) {
      return true;
    }

    return false;
  },
};

export default tokenUtils;
