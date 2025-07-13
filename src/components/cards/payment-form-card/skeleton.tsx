import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet } from "lucide-react";

export function PaymentFormCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="items-center justify-center">
            <Wallet size={18} />
          </div>
          <span>Gastos por forma de pagamento</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3">
        <div className="p-2 w-full">
          <div className="flex flex-col gap-3 h-full justify-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="flex justify-between border-b">
                <div className="font-semibold text-gray-600">
                  <Skeleton className="h-6 min-w-6 rounded-full" />
                </div>
                <div className="font-semibold">
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </Skeleton>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
