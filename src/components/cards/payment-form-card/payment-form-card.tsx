import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Wallet } from "lucide-react";
import { PaymentFormCardSkeleton } from "./skeleton";

export function PaymentFormCard({
  values,
}: {
  values: Array<{ method: string; value: number }>;
}) {
  return (
    <>
      {values.length > 1 ? (
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
                {values?.map(
                  (paymentForm: { method: string; value: number }) => (
                    <div
                      key={paymentForm.method}
                      className="flex justify-between border-b"
                    >
                      <p className="font-semibold text-gray-600">
                        {paymentForm.method}
                      </p>
                      <p className="font-semibold">
                        {paymentForm.value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}{" "}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <PaymentFormCardSkeleton />
      )}
    </>
  );
}
