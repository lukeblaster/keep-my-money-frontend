"use client";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "../ui/skeleton";

export function SpendingPerCategory({
  values,
}: {
  values: Array<{ name: string; color: string; value: number }>;
}) {
  if (!values) return;
  const chartConfig: ChartConfig = values.reduce((acc, { name, color }) => {
    const key = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "_");

    acc[key] = { label: name, color };
    return acc;
  }, {} as ChartConfig);

  const dataWithFill = values.map((item) => ({
    ...item,
    fill: item.color,
  }));

  console.log(dataWithFill);

  const total = values.reduce((sum, item) => sum + item.value, 0);
  return (
    <>
      {dataWithFill.length != 0 ? (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[210px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={dataWithFill}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Em despesas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      ) : (
        <div className="flex flex-col items-center justify-center text-center h-full">
          Sem compras categorizadas por enquanto. 🥱
        </div>
      )}
    </>
  );
}
