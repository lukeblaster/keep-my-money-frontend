import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { Pencil, PiggyBank } from "lucide-react";
interface BoxCard {
  id: number;
  name: string;
  currentValue: number;
  targetValue: number;
}

export function BoxCard({ props }: { props: BoxCard }) {
  const progress = (props.currentValue / props.targetValue) * 100;
  return (
    <Card className="py-5 cursor-pointer hover:bg-neutral-100 transition-colors">
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Pencil size={20} />
        </div>
        <PiggyBank size={64} className="stroke-2" />
        <div className="flex flex-col">
          <p className="font-semibold">{props.name}</p>
        </div>
        <Progress value={progress} />
        <p className="text-sm font-semibold">
          R$ {props.currentValue.toFixed(2)} / R$ {props.targetValue.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}
