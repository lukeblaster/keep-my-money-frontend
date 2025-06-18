import { instance as axios } from "../axios";

export const updatePaymentMethod = async ({ props }: { props: any }) => {
  const response = await axios.patch("/payment-method", props);

  return response;
};
