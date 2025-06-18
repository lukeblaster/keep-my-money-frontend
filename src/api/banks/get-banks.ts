import { instance as axios } from "../axios";

export const getBanks = async () => {
  try {
    const response = await axios.get("/bank-account");

    if (!Array.isArray(response.data)) {
      throw new Error("Dados de usuário inválidos.");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.status === 404
        ? "Nenhum banco encontrada."
        : "Erro ao buscar bancos."
    );
  }
};
