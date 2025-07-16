import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Tags } from "lucide-react";
import { SpendingPerCategory } from "../charts/spending-per-category";

export function ValuesByCategoryCard({
  values,
}: {
  values: Array<{ name: string; color: string; value: number; fill: string }>;
}) {
  return (
    <Card className="lg:w-2/5 max-h-fit">
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
