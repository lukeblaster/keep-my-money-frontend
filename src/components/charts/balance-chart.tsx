"use client";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export function BalanceChart({
  values,
}: {
  values: Array<{ type: string; value: number }>;
}) {
  if (!values) return;
  const chartData = [{ browser: "safari", visitors: 10, fill: "green" }];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const receita = values[0]?.value ?? 0;
  const despesas1 = values[1]?.value ?? 0;
  const despesas2 = values[2]?.value ?? 0;

  const saldoAtual = receita - despesas1 - despesas2;
  const saldoMaximo = receita;

  const valorMinGrafico = 90;
  const valorMaxGrafico = 450;

  // Evita divisão por zero e o caso 0 / 0
  const progressoInvertido =
    saldoMaximo === 0
      ? saldoAtual === 0
        ? 0
        : 1
      : 1 - saldoAtual / saldoMaximo;

  const valorParaGrafico =
    valorMinGrafico + (valorMaxGrafico - valorMinGrafico) * progressoInvertido;

  const porcentagemInvertida = progressoInvertido * 100;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={valorParaGrafico}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar
          dataKey="visitors"
          style={
            porcentagemInvertida < 50
              ? { fill: "#23d60f" }
              : porcentagemInvertida < 75
              ? { fill: "#dbe303" }
              : { fill: "#e00707" }
          }
          background
          cornerRadius={10}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                      className="fill-foreground text-4xl font-bold"
                    >
                      {porcentagemInvertida.toFixed(0)}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      de saldo utilizado
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
