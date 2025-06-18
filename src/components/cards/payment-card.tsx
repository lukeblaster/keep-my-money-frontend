import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, XCircle } from "lucide-react";
import { DeletePaymentForm } from "../forms/payment-forms/delete-payment-form";
import { EditPaymentForm } from "../forms/payment-forms/edit-payment-form";
import { PaymentMethod } from "@/types/payment-method";

interface PaymentCard {
  id: number;
  name: string;
  type: string;
}

export function PaymentCard({ props }: { props: PaymentMethod }) {
  return (
    <>
      <Card className="py-5 gap-3 hover:bg-neutral-50 transition-colors">
        <CardHeader className="flex justify-end">
          <CardTitle>
            <Dialog>
              <DialogTrigger className="cursor-pointer hover:text-red-500">
                <XCircle />
              </DialogTrigger>
              <DeletePaymentForm props={props} />
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-0">
          <CreditCard size={64} className="stroke-2 mb-3" />
          <Dialog>
            <DialogTrigger asChild>
              <p className="font-semibold hover:cursor-pointer hover:underline">
                {props.name}
              </p>
            </DialogTrigger>
            <EditPaymentForm props={props} />
          </Dialog>
          <p className="capitalize">{props.method}</p>
        </CardContent>
      </Card>
    </>
  );
}
