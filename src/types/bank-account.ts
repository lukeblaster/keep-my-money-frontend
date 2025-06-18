import { PaymentMethod } from "./payment-method";

export type BankAccount = {
  id: number;
  name: string;
  balance: number;
  ownerId: number;
  payment_methods: PaymentMethod[];
};
