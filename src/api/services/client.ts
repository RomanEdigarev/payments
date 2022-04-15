import axios from "axios";

const API_URL = process.env.VUE_APP_BASE_API;
export const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

client.interceptors.request.use((config) => {
  config.headers["X-Api-Token"] =
    "LkauAEJ3B2YLbrZxtwkcnXsXGhxSndsywWqtdVv7DrwXqpQ7fvJQgKVMFJPjhLM9";
  return config;
});
