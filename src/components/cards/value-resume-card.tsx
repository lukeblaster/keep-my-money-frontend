import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

export function ValueResumeCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: ReactNode;
}) {
  return (
    <Card className={`w-full gap-1 lg:gap-3`} style={{ color: color }}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-xs md:text-lg">
          {title}
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-2xl font-semibold">
            {value.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}{" "}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
