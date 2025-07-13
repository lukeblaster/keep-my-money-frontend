"use client";
import { ArrowUp, ArrowDown, TrendingUpDown } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDashboardData } from "@/hooks/query/use-dashboard-data";
import { ResumeCard } from "../cards/resume-card";
import { PaymentFormCard } from "../cards/payment-form-card/payment-form-card";
import { ValuesByCategoryCard } from "../cards/category-card";
import { BalanceCard } from "../cards/balance-card";

interface DashboardData {
  transactionValues: Array<{ type: string; value: number }>;
  valuesByCategory: Array<{ name: string; color: string; value: number }>;
  valuesByPaymentForm: Array<{ method: string; value: number }>;
}

interface UserProps {
  name: string;
  email: string;
}

export function DashboardResumeContainer() {
  const { data } = useDashboardData();
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setUser(JSON.parse(user));
      } catch (e) {
        console.error("Erro ao fazer parse do user", e);
      }
    }
  }, []);

  const response: DashboardData = data;

  const earnings = useMemo(() => {
    return response?.transactionValues[0];
  }, [response]);

  const expense = useMemo(() => {
    return response?.transactionValues[1];
  }, [response]);

  const investments = useMemo(() => {
    return response?.transactionValues[2];
  }, [response]);

  const valuesByPaymentForm = useMemo(() => {
    return response?.valuesByPaymentForm;
  }, [response]);

  const valuesByCategory = useMemo(() => {
    return response?.valuesByCategory;
  }, [response]);

  const transactionValues = useMemo(() => {
    return response?.transactionValues;
  }, [response]);

  return (
    <>
      {/* <div className="h-full flex justify-between items-end">
        <div>
          <h2 className="font-semibold">Olá, {user?.name}! 💸</h2>
          <p className="text-neutral-600">Seja bem-vindo(a) ao seu dashboard</p>
        </div>
      </div> */}
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
