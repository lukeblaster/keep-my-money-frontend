import { instance as axios } from "../axios";

export const signIn = async ({ props }: { props: any }) => {
  const credentials = btoa(`${props.email}:${props.password}`);
  const response = await axios.post(
    "/login",
    {},
    {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }
  );

  return response;
};
