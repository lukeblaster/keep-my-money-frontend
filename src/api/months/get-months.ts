import { instance as axios } from "../axios";
import { Month } from "@/types/months";

export const getMonths = async (): Promise<Month[]> => {
  try {
    const response = await axios.get("/months", {
      params: {
        ownerId: 13,
      },
    });

    if (!Array.isArray(response.data)) {
      throw new Error("Dados inválidos.");
    }

    return response.data;
  } catch (error: any) {
    // Aqui você pode fazer log, reformatar a mensagem etc.
    throw new Error(
      error?.response?.status === 404
        ? "Nenhum mês encontrado."
        : "Erro ao buscar meses."
    );
  }
};
