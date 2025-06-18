import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tags } from "lucide-react";
import { SpendingPerCategory } from "../charts/spending-per-category";

export function ValuesByCategoryCard({
  values,
}: {
  values: Array<{ name: string; color: string; value: number }>;
}) {
  return (
    <Card className="w-2/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Tags size={18} />
          </div>
          <span>Gastos por categoria</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <SpendingPerCategory values={values} />
      </CardContent>
    </Card>
  );
}
