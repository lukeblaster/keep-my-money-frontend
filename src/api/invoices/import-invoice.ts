import { instance as axios } from "../axios";

export const importInvoice = async ({ props }: { props: any }) => {
  const response = await axios.post("/invoice", props);

  return response;
};
