import axios from "axios";

export const instance = axios.create({
  baseURL: "https://keep-my-money-backend.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
