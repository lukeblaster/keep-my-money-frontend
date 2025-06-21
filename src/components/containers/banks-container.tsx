"use client";
import { BankAccount } from "@/types/bank-account";
import { BankCard } from "../cards/bank-card";
import Link from "next/link";
import { useBanksData } from "@/hooks/query/use-banks-data";
import { usePathname } from "next/navigation";

export function BanksContainer() {
  const { data } = useBanksData();
  const bankAccounts = data ?? ([] as BankAccount[]);
  const pathname = usePathname();

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-3 mt-6">
        {bankAccounts.map((bank) => (
          <Link key={bank.id} href={`${pathname}/${bank.id}`}>
            <BankCard props={bank} />
          </Link>
        ))}
      </div>
    </>
  );
}
