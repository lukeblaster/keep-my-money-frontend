import { instance as axios } from "../axios";

export const deletePaymentMethod = async ({ props }: { props: any }) => {
  const response = await axios.delete("/payment-method", {
    data: {
      id: props.id,
    },
  });

  return response;
};
