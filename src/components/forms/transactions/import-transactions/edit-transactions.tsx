import { useAppSelector } from "@/store/hooks";
import { EditTransactionsItem } from "./edit-transactions-item";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useBanksData } from "@/hooks/query/use-banks-data";
import { PaymentMethod } from "@/types/payment-method";
import { BankAccount } from "@/types/bank-account";
import { importInvoice } from "@/api/invoices/import-invoice";
import { FormInputError } from "@/components/errors/form-input-error";
import { ImportInvoiceFormData, importInvoiceSchema } from "@/schema/invoice";
import { ScrollArea } from "@/components/ui/scroll-area";

export const EditTransactions = ({
  setStep,
  month_name,
  year,
}: {
  setStep: Dispatch<SetStateAction<string>>;
  month_name: string;
  year: number;
}) => {
  const banks = useBanksData();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>();
  const transactions = useAppSelector((state) => state.transaction);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ImportInvoiceFormData>({
    resolver: zodResolver(importInvoiceSchema),
    defaultValues: {
      invoiceTransactions: transactions,
      month: month_name,
      year: Number(year),
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: importInvoice,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", [year, month_name]],
      });
      toast.success(response.data.message);
      reset();
    },
  });

  const selectedBank = watch("bankAccountId");

  const onSubmit: SubmitHandler<ImportInvoiceFormData> = (data) => {
    const props = {
      invoiceTransactions: transactions.filter(
        (transaction) => transaction.shouldImport == true
      ),
      month: month_name,
      year: parseInt(year as unknown as string),
      bankAccountId: data.bankAccountId,
      paymentMethodId: data.paymentMethodId,
    };

    return mutation.mutate({ props: props });
  };

  useEffect(() => {
    const bank: BankAccount[] =
      banks.data?.filter((bank) => bank.id == selectedBank) ||
      ([] as BankAccount[]);

    setPaymentMethods(bank[0]?.payment_methods);

    return () => {};
  }, [selectedBank, banks.data]);

  return (
    <div className="flex flex-col text-left w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex space-x-3">
          <div className="flex flex-col space-y-1.5">
            <Label>Conta bancária</Label>
            <Select
              onValueChange={(val) =>
                setValue("bankAccountId", val as unknown as number)
              }
              {...register("bankAccountId", { valueAsNumber: true })}
            >
              <SelectTrigger className="w-70">
                <SelectValue placeholder="Escolha um banco" />
              </SelectTrigger>
              <SelectContent>
                {banks.data?.map((bank) => (
                  <SelectItem key={bank.id} value={`${bank.id}`}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormInputError>{errors.bankAccountId?.message}</FormInputError>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Forma de pagamento</Label>
            <Select
              onValueChange={(val) =>
                setValue("paymentMethodId", val as unknown as number, {
                  shouldValidate: true,
                })
              }
              {...register("paymentMethodId", { valueAsNumber: true })}
              disabled={selectedBank == undefined ? true : false}
            >
              <SelectTrigger className="w-70">
                <SelectValue placeholder="Escolha uma forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods?.map((payment) => (
                  <SelectItem key={payment.id} value={`${payment.id}`}>
                    {payment.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormInputError>{errors.paymentMethodId?.message}</FormInputError>
          </div>
        </div>

        <ScrollArea className="h-96 scroll-auto pr-3">
          <table className="w-full border-spacing-x-1.5 border-spacing-y-0.5 border-separate">
            <thead className="text-sm">
              <tr>
                <th>Importar?</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Valor</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {transactions.map((transaction) => (
                <EditTransactionsItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </ScrollArea>
        <DialogFooter>
          <Button variant={"ghost"} onClick={() => setStep("upload")}>
            Cancelar
          </Button>
          <Button type="submit">Importar</Button>
        </DialogFooter>
      </form>
    </div>
  );
};
