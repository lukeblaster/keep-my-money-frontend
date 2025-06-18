"use client";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useYearsData } from "@/hooks/query/use-years-data";

export function YearsWrapper() {
  const pathname = usePathname();
  const { data } = useYearsData();

  return (
    <section className="grid grid-cols-4 gap-3">
      {data?.map((year) => (
        <Link
          key={year.year}
          href={`${pathname}/${year.year}`}
          className={`flex items-center gap-3 text-black cursor-pointer`}
        >
          <Card className="w-full hover:bg-muted">
            <CardContent className="flex items-center gap-3">
              <Calendar />
              <p className="text-muted-foreground">Transações de {year.year}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
}
