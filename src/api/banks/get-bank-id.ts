import { instance as axios } from "../axios";

export const getBankById = async ({ id }: { id: number }) => {
  try {
    const response = await axios.get("/bank-account", {
      params: {
        bankId: id,
      },
    });

    if (!Array.isArray(response.data)) {
      throw new Error("Dados de usuário inválidos.");
    }

    return response.data;
  } catch (error: any) {
    // Aqui você pode fazer log, reformatar a mensagem etc.
    throw new Error(
      error?.response?.status === 404
        ? "Nenhum banco encontrada."
        : "Erro ao buscar bancos."
    );
  }
};
