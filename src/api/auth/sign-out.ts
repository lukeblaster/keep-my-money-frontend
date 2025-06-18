import { instance as axios } from "../axios";

export const signOut = async () => {
  const response = await axios.post("/signout");

  return response;
};
