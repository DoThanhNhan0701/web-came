import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN } from "@/constants/auth";
import { getToken, setToken } from "@/utils/secureStore";
import axios from "axios";
import { endpoints } from "./endpoints";

// Callback to handle logout - will be set during app initialization
let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (callback: () => void) => {
  logoutCallback = callback;
};

const PUBLIC_ENDPOINTS = ["/api/v1/auth/login"];

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
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

    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
      config?.url?.includes(endpoint)
    );

    if (
      response?.status === 401 &&
      config?.url !== endpoints.REFRESH &&
      !isPublicEndpoint
    ) {
      try {
        const refreshToken = await getToken(REFRESH_TOKEN);
        if (!refreshToken || typeof refreshToken !== "string") {
          logoutCallback?.();
          throw error(new Error("Session expired. Please login again."));
        }

        const res = await axiosInstance.post(endpoints.REFRESH, {
          refresh_token: refreshToken,
        });

        const newAccessToken = res?.data?.access_token;
        const newRefreshToken = res?.data?.refresh_token;

        if (!newAccessToken) {
          throw new Error("No access token in refresh response");
        }

        await setToken(ACCESS_TOKEN, newAccessToken);
        if (newRefreshToken) {
          await setToken(REFRESH_TOKEN, newRefreshToken);
        }

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(config);
      } catch {
        logoutCallback?.();
        throw error(new Error("Session expired. Please login again."));
      }
    }

    throw error;
  }
);

export { axiosInstance };
