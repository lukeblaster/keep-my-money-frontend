import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Scale } from "lucide-react";
import { BalanceChart } from "../charts/balance-chart";

export function BalanceCard({
  values,
}: {
  values: Array<{ type: string; value: number }>;
}) {
  return (
    <Card className="lg:w-2/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Scale size={18} />
          </div>
          <span>Saldo atual</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BalanceChart values={values ?? []} />
      </CardContent>
    </Card>
  );
}
