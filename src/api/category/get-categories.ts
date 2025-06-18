import { instance as axios } from "../axios";

export const getCategories = async () => {
  try {
    const response = await axios.get("/category");

    if (!Array.isArray(response.data)) {
      throw new Error("Dados de categoria inválidos.");
    }

    return response.data;
  } catch (error: any) {
    // Aqui você pode fazer log, reformatar a mensagem etc.
    throw new Error(
      error?.response?.status === 404
        ? "Nenhuma categoria encontrada."
        : "Erro ao buscar catergorias."
    );
  }
};
