import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ReactElement } from "react";

export function ResumeCard({
  icon,
  value,
  description,
}: {
  icon: ReactElement;
  value: number;
  description: string;
}) {
  return (
    <Card className="gap-1">
      <CardHeader>{icon}</CardHeader>
      <CardContent>
        <p className="text-xl font-semibold">
          {value?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }) ?? "R$ 0,00"}
        </p>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
