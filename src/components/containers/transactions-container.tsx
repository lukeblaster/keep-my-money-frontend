"use client";
import { transactionColumns } from "../columns/transactions-columns";
import { ResumeCardsWrapper } from "../wrappers/resume-cards-wrapper";
import { TransactionTable } from "../tables/transaction-table";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { AddTransactionForm } from "../forms/transactions/add-transaction-form";
import { useTransactionsData } from "../../hooks/query/use-transactions-data";
import {
  TransactionAdapter,
  TransactionAdapterProps,
} from "../../adapters/transaction-adapter";
import Link from "next/link";

export function TransactionsContainer({
  year,
  month_name,
}: {
  year: number;
  month_name: string;
}) {
  const { data } = useTransactionsData({
    year,
    month_name,
  });
  const transactions =
    TransactionAdapter({ transactions: data || [] }) ??
    ([] as TransactionAdapterProps[]);
  return (
    <>
      <div className="flex flex-col">
        <Breadcrumb className="mt-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/painel/transacoes">Transações</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/painel/transacoes/${year}`}>{year}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage className="capitalize">
              {month_name == "marco" ? "março" : (month_name as string)}
            </BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-between my-0.5">
        <h3 className="font-semibold text-2xl capitalize">
          {month_name == "marco" ? "março" : (month_name as string)}
        </h3>
        <AddTransactionForm month_name={month_name} year={year} />
      </div>
      <section className="flex flex-col">
        <ResumeCardsWrapper transactions={transactions} />
        <h3 className="font-semibold">Transações do mês</h3>
        <TransactionTable columns={transactionColumns} data={transactions} />
      </section>
    </>
  );
}
