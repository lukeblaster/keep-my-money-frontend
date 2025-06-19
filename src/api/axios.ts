import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
