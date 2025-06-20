import axios from "axios";

export const instance = axios.create({
  baseURL: "https://keep-my-money-backend.vercel.app",
  withCredentials: true,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});
