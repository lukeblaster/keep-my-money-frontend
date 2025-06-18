import { instance as axios } from "../axios";

export const deleteTransactionOnMonth = async ({ props }: { props: any }) => {
  const response = await axios.delete("/transaction", {
    data: {
      id: props.id,
    },
  });

  return response;
};
