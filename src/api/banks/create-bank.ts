import { CreateBankAccountInput } from "../../schema/bank-account";
import { instance as axios } from "../axios";

export const createBank = async (props: CreateBankAccountInput) => {
  const response = await axios.post("/bank-account", props);

  return response;
};
