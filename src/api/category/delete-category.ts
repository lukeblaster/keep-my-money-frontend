import { instance as axios } from "../axios";

export const deleteCategory = async ({ props }: { props: any }) => {
  const response = await axios.delete("/category", {
    data: {
      id: props.id,
    },
  });

  return response;
};
