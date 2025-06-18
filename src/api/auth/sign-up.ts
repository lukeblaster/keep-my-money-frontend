import { instance as axios } from "../axios";

export const signUp = async ({ props }: { props: any }) => {
  const response = await axios.post("/register", props);

  return response;
};
