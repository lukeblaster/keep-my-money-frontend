"use client";
import { ArrowUp, ArrowDown, TrendingUpDown } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDashboardData } from "../../hooks/query/use-dashboard-data";
import { ResumeCard } from "../cards/resume-card";
import { PaymentFormCard } from "../cards/payment-form-card/payment-form-card";
import { ValuesByCategoryCard } from "../cards/category-card";
import { BalanceCard } from "../cards/balance-card";

interface DashboardData {
  transactionValues: Array<{ type: string; value: number }>;
  valuesByCategory: Array<{
    name: string;
    color: string;
    value: number;
    fill: string;
  }>;
  valuesByPaymentForm: Array<{ method: string; value: number }>;
}

interface UserProps {
  name: string;
  email: string;
}

export function DashboardResumeContainer() {
  const { data } = useDashboardData();

  const response: DashboardData = data;

  const {
    transactionValues = [],
    valuesByCategory = [],
    valuesByPaymentForm = [],
  } = response || {};

  const [earnings, expense, investments] = transactionValues;

  return (
    <>
      <div className="flex flex-col lg:grid grid-cols-3 gap-3">
        <ResumeCard
          icon={
            <ArrowUp
              className="text-green-600 bg-gray-200 rounded-full p-1.5"
              size={32}
            />
          }
          value={earnings?.value}
          description="Valor de entradas no mês atual"
        />
        <ResumeCard
          icon={
            <ArrowDown
              className="text-red-600 bg-gray-200 rounded-full p-1.5"
              size={32}
            />
          }
          value={expense?.value}
          description="Valor de despesas no mês atual"
        />
        <ResumeCard
          icon={
            <TrendingUpDown
              className="text-blue-600 bg-gray-200 rounded-full p-1.5"
              size={32}
            />
          }
          value={investments?.value}
          description="Valor de investimento no mês atual"
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-3">
        <PaymentFormCard values={valuesByPaymentForm} />
        <ValuesByCategoryCard values={valuesByCategory} />
        <BalanceCard values={transactionValues} />
      </div>
    </>
  );
}
