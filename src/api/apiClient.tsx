import axios from "axios";
import { API_HOST } from "../libs/constants";
import { getCookie } from "../libs/utils";

const apiClient = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const csrfToken = getCookie("XSRF-TOKEN") ?? "";

  if (csrfToken) {
    config.headers["X-XSRF-TOKEN"] = csrfToken;
  }

  return config;
});

export default apiClient;
