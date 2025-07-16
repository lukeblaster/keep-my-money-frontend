import { Card, CardContent } from "../ui/card";
import { BankAccount } from "../../types/bank-account";
import { Bitcoin, CreditCard, HandCoins, Landmark } from "lucide-react";

export function BankCard({ props }: { props: BankAccount }) {
  return (
    <Card className="py-5 cursor-pointer hover:bg-neutral-100 transition-colors">
      <CardContent className="flex flex-col gap-3">
        <Landmark size={64} className="stroke-2" />
        <p className="font-semibold">{props.name}</p>
        <div className="flex gap-2">
          <HandCoins size={20} />
          <CreditCard size={20} />
          <Bitcoin size={20} />
        </div>
      </CardContent>
    </Card>
  );
}
