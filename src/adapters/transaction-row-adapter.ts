import { TransactionOnMonth } from "../components/columns/transactions-columns";
import { PaymentMethod } from "../types/payment-method";
import { BankAccount } from "../types/bank-account";
import { Category } from "../types/category";
import { Row } from "@tanstack/react-table";

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

export const TransactionRowAdapter = ({ row }: { row: Row<any> }) => {
  return {
    id: row.getValue("id") as number,
    description: row.getValue("description") as string,
    type: row.getValue("type") as string,
    date: row.getValue("date") as Date,
    paied: row.getValue("paied") as boolean,
    finalValue: row.getValue("finalValue") as number,
    installmentValue: row.getValue("installmentValue") as number,
    installment: row.getValue("installment") as number,
    installments: row.getValue("installments") as number,
    category: row.getValue("category") as Category,
    TransactionOnMonth: row.getValue(
      "TransactionOnMonth"
    ) as TransactionOnMonth[],
    BankAccount: row.getValue("BankAccount") as BankAccount,
    PaymentMethod: row.getValue("PaymentMethod") as PaymentMethod,
  };
};
