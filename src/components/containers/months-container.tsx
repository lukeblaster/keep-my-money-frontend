"use client";
import { Month } from "../../types/months";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Card, CardContent } from "../ui/card";
import { CalendarDays } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMonthsData } from "../../hooks/query/use-months-data";

export function MonthsContainer({ year }: { year: number }) {
  const pathname = usePathname();
  const { data } = useMonthsData();
  const months = data ?? ([] as Month[]);
  const monthsObject = months.filter((month) => month.year == year);

  return (
    <>
      <div className="flex flex-col">
        <Breadcrumb className="mt-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/painel/transacoes">
                Transações
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>{year}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg">Ano de {year}</h3>
        <p className="text-neutral-500">
          Clique no mês desejado para ver suas transações
        </p>
      </div>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {monthsObject?.map((month) => (
          <Link
            key={month?.id + month?.month}
            href={`${pathname}/${month?.month}`}
            className={`flex items-center gap-3 text-black capitalize cursor-pointer`}
          >
            <Card className="h-fit w-full hover:bg-neutral-100">
              <CardContent className="flex items-center gap-3">
                <CalendarDays className="text-gray-800" />
                <p>{month?.month}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </>
  );
}
