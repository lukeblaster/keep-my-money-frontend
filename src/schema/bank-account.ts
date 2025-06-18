import { z } from "zod";

// CREATE BANK ACCOUNT
export const CreateBankAccountSchema = z.object({
  name: z.string(),
});

export type CreateBankAccountInput = z.infer<typeof CreateBankAccountSchema>;

// READ BANK ACCOUNT

// UPDATE BANK ACCOUNT

export const UpdateBankAccountSchema = z.object({
  id: z.number().int().positive(),
  name: z
    .string()
    .min(3, { message: "O nome precisa de no mínimo 3 caracteres." }),
  balance: z.number().optional().nullable(),
});

export type UpdateBankAccountInput = z.infer<typeof UpdateBankAccountSchema>;

// DELETE BANK ACCOUNT

export const DeleteBankAccountSchema = z.object({
  id: z.number().int().positive(),
});

export type DeleteBankAccountInput = z.infer<typeof DeleteBankAccountSchema>;
