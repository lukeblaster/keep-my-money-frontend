import { instance as axios } from "../axios";

export const getDashboardInfo = async () => {
  try {
    const response = await axios.get("/dashboard");

    return response.data;
  } catch (error: any) {
    // Aqui você pode fazer log, reformatar a mensagem etc.
    throw new Error(
      error?.response?.status === 404
        ? "Nenhuma dado encontrada."
        : "Erro ao buscar dados."
    );
  }
};
