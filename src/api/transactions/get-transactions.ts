import { instance as axios } from "../axios";

export const getTransactions = async ({
  year,
  month_name,
}: {
  year: number;
  month_name: string;
}): Promise<any[]> => {
  try {
    const response = await axios.get("/transaction", {
      params: {
        monthName: month_name,
        year: year,
      },
    });

    if (!Array.isArray(response.data)) {
      throw new Error("Dados de transação inválidos.");
    }

    return response.data;
  } catch (error: any) {
    // Aqui você pode fazer log, reformatar a mensagem etc.
    throw new Error(
      error?.response?.status === 404
        ? "Nenhuma transação encontrada."
        : "Erro ao buscar transações."
    );
  }
};
