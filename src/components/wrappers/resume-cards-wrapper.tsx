"use client";
import {
  FaMoneyBill1,
  FaMoneyBills,
  FaMoneyBillTrendUp,
  FaScaleBalanced,
} from "react-icons/fa6";
import { ValueResumeCard } from "../cards/value-resume-card";
import { useMemo } from "react";
import { Category } from "@/types/category";
import { TransactionOnMonth } from "../columns/transactions-columns";
import { BankAccount } from "@/types/bank-account";
import { PaymentMethod } from "@/types/payment-method";

interface ResumeCardsWrapper {
  id: number;
  description: string;
  type: string;
  date: Date;
  paied: boolean;
  finalValue: number;
  installmentValue: number;
  installment: number;
  installments: number;
  category: Category;
  TransactionOnMonth: TransactionOnMonth[];
  BankAccount: BankAccount;
  PaymentMethod: PaymentMethod;
}

export function ResumeCardsWrapper({
  transactions,
}: {
  transactions: ResumeCardsWrapper[];
}) {
  const entryValue = transactions.reduce((accumulator, currentValue) => {
    if (currentValue.TransactionOnMonth && currentValue.type == "ganho")
      return accumulator + currentValue.TransactionOnMonth[0].value;

    return accumulator;
  }, 0);

  const expenseValue = transactions.reduce((accumulator, currentValue) => {
    if (currentValue.TransactionOnMonth && currentValue.type == "despesa")
      return accumulator + currentValue.TransactionOnMonth[0].value;

    return accumulator;
  }, 0);

  const investmentValue = transactions.reduce((accumulator, currentValue) => {
    if (currentValue.TransactionOnMonth && currentValue.type == "investimento")
      return accumulator + currentValue.TransactionOnMonth[0].value;

    return accumulator;
  }, 0);

  const resumeValue = entryValue - expenseValue - investmentValue;

  return (
    <div className="grid grid-cols-2 lg:flex gap-3 w-full mb-6">
      <ValueResumeCard
        title="Entradas"
        value={entryValue}
        color="#4ac23f"
        icon={<FaMoneyBill1 className="size-4.5 lg:size-6" />}
      />
      <ValueResumeCard
        title="Saídas"
        value={expenseValue}
        color="#d14c4c"
        icon={<FaMoneyBills className="size-4.5 lg:size-6" />}
      />
      <ValueResumeCard
        title="Investimentos"
        value={investmentValue}
        color="#4171c9"
        icon={<FaMoneyBillTrendUp className="size-4.5 lg:size-6" />}
      />
      <ValueResumeCard
        title="Saldo do mês"
        value={resumeValue}
        color="#4f5674"
        icon={<FaScaleBalanced className="size-4.5 lg:size-6" />}
      />
    </div>
  );
}
