"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Row } from "@tanstack/react-table";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionOnMonth } from "../../columns/transactions-columns";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Pencil } from "lucide-react";
import { useCategoryData } from "../../../hooks/query/use-category-data";
import { FormInputError } from "../../errors/form-input-error";
import { Category } from "../../../types/category";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateTransactionOnMonth } from "../../../api/transactions/update-transaction-month";
import { BankAccount } from "../../../types/bank-account";
import { PaymentMethod } from "../../../types/payment-method";
import { useBanksData } from "../../../hooks/query/use-banks-data";
import { toast } from "sonner";
import { ApiError } from "../../../types/error";
import { Switch } from "../../ui/switch";
import { TransactionAdapterProps } from "../../../adapters/transaction-adapter";
import { TransactionRowAdapter } from "../../../adapters/transaction-row-adapter";

const editTransactionSchema = z.object({
  description: z
    .string()
    .min(3, { message: "São necessários 3 ou mais caracteres." }),
  value: z
    .number({ invalid_type_error: "Tipo inválido" })
    .min(1, { message: "Valores nulos ou negativos não permitidos" }),
  type: z.enum(["ganho", "despesa", "investimento"], {
    required_error: "Selecione um tipo",
    invalid_type_error: "Tipo inválido",
  }),
  bank: z.number(),
  paied: z.boolean(),
  paymentMethod: z.number(),
  date: z.string(),
  category: z.number(),
});

type EditTransactionFormData = z.infer<typeof editTransactionSchema>;

interface EditTransactionFormProps {
  id: number;
  description: string;
  type: string;
  date: Date;
  paied: boolean;
  finalValue: number;
  installmentValue: number;
  installment: number;
  installments: number;
  category: Category;
  TransactionOnMonth: TransactionOnMonth[];
  BankAccount: BankAccount;
  PaymentMethod: PaymentMethod;
}

export function EditTransactionForm({
  row,
}: {
  row: Row<EditTransactionFormProps>;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>();
  const queryClient = useQueryClient();
  const banks = useBanksData();
  const categories = useCategoryData();
  const transaction = TransactionRowAdapter({ row: row });
  const defaultDate = new Date(transaction.date).toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditTransactionFormData>({
    resolver: zodResolver(editTransactionSchema),
    defaultValues: {
      type: transaction.type as "ganho" | "despesa" | "investimento",
      category: transaction.category?.id || 0,
      bank: transaction.BankAccount?.id || 0,
      paymentMethod: transaction.PaymentMethod?.id,
      paied: transaction.paied,
    },
  });

  const mutation = useMutation({
    mutationFn: updateTransactionOnMonth,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setOpenDialog(false);
      toast.success(response.data.message);
    },
    onError: (e: ApiError) => {
      toast.error(e.message);
    },
  });

  const selectedBank = watch("bank");

  const onSubmit: SubmitHandler<EditTransactionFormData> = (data) => {
    const props = {
      id: transaction.id,
      name: data.description,
      type: data.type,
      date: data.date,
      categoryId: data.category,
      referenceMonthId: transaction.TransactionOnMonth[0].referenceMonthId,
      bankAccountId: data.bank,
      paymentMethodId: data.paymentMethod,
      installmentValue: data.value,
      transactionOnMonthId: transaction.TransactionOnMonth[0].id,
      paied: data.paied,
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
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className="flex gap-1 items-center w-full">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setTimeout(() => setOpenDialog(true), 0);
          }}
          className="w-full"
        >
          <Pencil className="text-black" />
          <p>Editar</p>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-start gap-1.5">
            <Pencil size={20} />
            <p>Edite a transação</p>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label>Descrição</Label>
            <Input
              defaultValue={transaction.description}
              {...register("description")}
            />
            <FormInputError>{errors.description?.message}</FormInputError>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-full">
              <Label>Valor da parcela</Label>
              <Input
                type="number"
                defaultValue={transaction.installmentValue}
                step="0.01"
                {...register("value", { valueAsNumber: true })}
              />
              <FormInputError>{errors.value?.message}</FormInputError>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Label>Tipo</Label>
              <Select
                defaultValue={`${transaction.type}`}
                onValueChange={(type) =>
                  setValue(
                    "type",
                    type as "ganho" | "despesa" | "investimento",
                    {
                      shouldValidate: true,
                    }
                  )
                }
                {...register("type")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ganho">Ganho</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                  <SelectItem value="investimento">Investimento</SelectItem>
                </SelectContent>
              </Select>
              <FormInputError>{errors.type?.message}</FormInputError>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Data da transação</Label>
            <Input
              type="date"
              defaultValue={defaultDate}
              {...register("date")}
            />
            <FormInputError>{errors.date?.message}</FormInputError>
          </div>
          <div className="flex w-full gap-3">
            <div className="flex flex-col gap-1 w-full">
              <Label>Banco</Label>
              <Select
                onValueChange={(val) =>
                  setValue("bank", val as unknown as number)
                }
                defaultValue={`${transaction.BankAccount.id}`}
                {...register("bank", { valueAsNumber: true })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {banks.data?.map((bank) => (
                    <SelectItem key={bank.id} value={`${bank.id}`}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormInputError>{errors.value?.message}</FormInputError>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label>Forma de pagamento</Label>
              <Select
                onValueChange={(val) =>
                  setValue("paymentMethod", val as unknown as number, {
                    shouldValidate: true,
                  })
                }
                defaultValue={`${transaction.PaymentMethod.id}`}
                {...register("paymentMethod", { valueAsNumber: true })}
                disabled={selectedBank == undefined ? true : false}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {paymentMethods?.map((payment) => (
                    <SelectItem key={payment.id} value={`${payment.id}`}>
                      {payment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormInputError>{errors.type?.message}</FormInputError>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Categoria</Label>
            <Select
              onValueChange={(value) =>
                setValue("category", value as unknown as number)
              }
              defaultValue={`${transaction.category?.id || 0}`}
              {...register("category", { valueAsNumber: true })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value={`${0}`}>Sem categoria</SelectItem>
                {categories.data?.map((category) => (
                  <SelectItem key={category.id} value={`${category.id}`}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormInputError>{errors.category?.message}</FormInputError>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <Label>Pago</Label>
              <Switch
                {...register("paied")}
                defaultChecked={transaction.paied}
                onCheckedChange={(value) => setValue("paied", value)}
              />
            </div>
            <FormInputError>{errors.paied?.message}</FormInputError>
          </div>

          <DialogFooter className="flex justify-between mt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              Atualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
