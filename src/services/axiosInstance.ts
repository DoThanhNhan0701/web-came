import axios from "axios";

import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN } from "@/constants/auth";
import { getToken, setToken } from "@/utils/secureStore";
import { endpoints } from "./endpoints";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getToken(ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const { config, response } = error;

    if (!response) throw error;

    // If Unauthorized & not refreshing token
    if (response.status === 401 && config.url !== endpoints.REFRESH_TOKEN) {
      const refreshToken = await getToken(REFRESH_TOKEN);

      if (!refreshToken) {
        // store.dispatch(actionLogout());
        throw error;
      }

      try {
        const res = await axiosInstance.post(endpoints.REFRESH_TOKEN, {
          refresh: refreshToken,
        });

        const newAccess = res?.data?.data?.access;
        const newRefresh = res?.data?.data?.refresh;

        await setToken(ACCESS_TOKEN, newAccess);
        await setToken(REFRESH_TOKEN, newRefresh);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccess}`;
        config.headers["Authorization"] = `Bearer ${newAccess}`;

        return axiosInstance(config);
      } catch (err) {
        // store.dispatch(actionLogout());
        console.error("Refresh token failed:", err);
        throw err;
      }
    }

    throw error;
  }
);

export { axiosInstance };
