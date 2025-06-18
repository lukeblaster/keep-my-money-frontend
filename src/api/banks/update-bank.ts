import { UpdateBankAccountInput } from "@/schema/bank-account";
import { instance as axios } from "../axios";

export const updateBankAccount = async (props: UpdateBankAccountInput) => {
  const response = await axios.patch("/bank-account", props);

  return response;
};
