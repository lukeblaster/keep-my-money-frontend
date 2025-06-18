import { instance as axios } from "../axios";

export const createPaymentMethod = async ({ props }: { props: any }) => {
  const response = await axios.post("/payment-method", props);

  return response;
};
