import { z } from "zod";

export const importInvoiceSchema = z.object({
  invoiceTransactions: z.array(
    z.object({
      name: z
        .string()
        .min(3, { message: "São necessários 3 ou mais caracteres." }),
      finalValue: z
        .number({ invalid_type_error: "Tipo inválido" })
        .min(1, { message: "Valores nulos ou negativos não permitidos" }),
      type: z.enum(["ganho", "despesa", "investimento"], {
        required_error: "Selecione um tipo",
        invalid_type_error: "Tipo inválido",
      }),
      date: z.string(),
    })
  ),
  month: z.string(),
  year: z.number(),
  bankAccountId: z.number({ required_error: "Banco obrigatório." }),
  paymentMethodId: z.number({
    required_error: "Forma de pagamento obrigatória.",
  }),
});

export type ImportInvoiceFormData = z.infer<typeof importInvoiceSchema>;
