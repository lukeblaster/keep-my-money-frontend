import { z } from "zod";

export const CreateYearMonthsSchema = z.object({
  year: z
    .number({ invalid_type_error: "Informe um número válido" })
    .gte(2000, { message: "O ano mínimo é 2000." })
    .lte(2100, { message: "O ano máximo é 2100." }),
});

export type CreateYearMonthInput = z.infer<typeof CreateYearMonthsSchema>;
