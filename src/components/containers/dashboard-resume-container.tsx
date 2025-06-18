"use client";
import { ArrowUp, ArrowDown, TrendingUpDown } from "lucide-react";
import React from "react";
import { useDashboardData } from "@/hooks/query/use-dashboard-data";
import { ResumeCard } from "../cards/resume-card";
import { PaymentFormCard } from "../cards/payment-form-card";
import { ValuesByCategoryCard } from "../cards/category-card";
import { BalanceCard } from "../cards/balance-card";

interface DashboardData {
  transactionValues: Array<{ type: string; value: number }>;
  valuesByCategory: Array<{ name: string; color: string; value: number }>;
  valuesByPaymentForm: Array<{ method: string; value: number }>;
}

export function DashboardResumeContainer() {
  const { data } = useDashboardData();

  const response: DashboardData = data;

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <ResumeCard
          icon={<ArrowUp className="text-green-600" size={22} />}
          value={response?.transactionValues[0]?.value}
          description="Valor de entradas no mês atual"
        />
        <ResumeCard
          icon={<ArrowDown className="text-red-600" size={22} />}
          value={response?.transactionValues[1]?.value}
          description="Valor de despesas no mês atual"
        />
        <ResumeCard
          icon={<TrendingUpDown className="text-blue-600" size={22} />}
          value={response?.transactionValues[2]?.value}
          description="Valor de investimento no mês atual"
        />
      </div>
      <div className="flex w-full gap-3">
        <PaymentFormCard values={response?.valuesByPaymentForm} />
        <ValuesByCategoryCard values={response?.valuesByCategory} />
        <BalanceCard values={response?.transactionValues} />
      </div>
    </>
  );
}
