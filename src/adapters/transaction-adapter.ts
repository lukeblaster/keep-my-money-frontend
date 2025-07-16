import { TransactionOnMonth } from "../components/columns/transactions-columns";
import { PaymentMethod } from "../types/payment-method";
import { BankAccount } from "../types/bank-account";
import { Category } from "../types/category";

export interface TransactionAdapterProps {
  id: number;
  name: string;
  type: string;
  finalValue: number;
  installments: number;
  date: Date;
  BankAccount: BankAccount;
  Category: Category;
  PaymentMethod: PaymentMethod;
  TransactionOnMonth: TransactionOnMonth[];
}

export const TransactionAdapter = ({
  transactions,
}: {
  transactions: TransactionAdapterProps[];
}) => {
  return transactions?.map((transaction) => {
    return {
      id: transaction.id,
      description: transaction.name,
      type: transaction.type,
      date: transaction.date,
      paied: transaction.TransactionOnMonth[0].paied,
      finalValue: transaction.finalValue,
      installmentValue: transaction.TransactionOnMonth[0].value,
      installment: transaction.TransactionOnMonth[0].installment,
      installments: transaction.installments,
      category: transaction.Category,
      TransactionOnMonth: transaction.TransactionOnMonth,
      BankAccount: transaction.BankAccount,
      PaymentMethod: transaction.PaymentMethod,
    };
  });
};
