import { DeleteBankAccountInput } from "@/schema/bank-account";
import { instance as axios } from "../axios";

export const deleteBank = async (props: DeleteBankAccountInput) => {
  const response = await axios.delete("/bank-account", {
    data: {
      id: props.id,
    },
  });

  return response;
};
