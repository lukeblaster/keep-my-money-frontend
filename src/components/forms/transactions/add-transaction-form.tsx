"use client";
import { createTransaction } from "@/api/transactions/create-transaction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useCategoryData } from "@/hooks/query/use-category-data";
import { FormInputError } from "@/components/errors/form-input-error";
import { useBanksData } from "@/hooks/query/use-banks-data";
import { useEffect, useState } from "react";
import { PaymentMethod } from "@/types/payment-method";
import { BankAccount } from "@/types/bank-account";
import { toast } from "sonner";

const addTransactionSchema = z.object({
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
  installments: z
    .number({ invalid_type_error: "Tipo inválido." })
    .min(1, { message: "Informe um valor maior ou igual a 1." }),
  date: z.date({ invalid_type_error: "Data inválida." }),
  category: z.number(),
  bank: z.number(),
  paymentMethod: z.number(),
});

type AddTransactionFormData = z.infer<typeof addTransactionSchema>;

export function AddTransactionForm({
  month_name,
  year,
}: {
  month_name: string;
  year: number;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>();
  const categories = useCategoryData();
  const banks = useBanksData();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddTransactionFormData>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      category: 0,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success(response.data.message);
      reset();
      setIsDialogOpen(false);
    },
  });
  const selectedBank = watch("bank");
  const onSubmit: SubmitHandler<AddTransactionFormData> = (data) => {
    const props = {
      name: data.description,
      type: data.type,
      date: data.date,
      installments: data.installments,
      finalValue: data.value,
      month: month_name,
      year: parseInt(year as unknown as string),
      categoryId: data.category,
      bankAccountId: data.bank,
      paymentMethodId: data.paymentMethod,
    };
    const response = mutation.mutate({ props: props });

    return response;
  };

  useEffect(() => {
    const bank: BankAccount[] =
      banks.data?.filter((bank) => bank.id == selectedBank) ||
      ([] as BankAccount[]);

    setPaymentMethods(bank[0]?.payment_methods);

    return () => {};
  }, [selectedBank, banks.data]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="button-primary items-center cursor-pointer">
          <PlusCircle />
          <p>Nova transação</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova transação</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label>Descrição</Label>
            <Input
              placeholder="Descrição da transação"
              {...register("description")}
            />
            <FormInputError>{errors.description?.message}</FormInputError>
          </div>
          <div className="flex w-full gap-3">
            <div className="flex flex-col gap-1 w-full">
              <Label>Valor</Label>
              <Input
                type="number"
                defaultValue={0}
                step="1"
                {...register("value", { valueAsNumber: true })}
              />
              <FormInputError>{errors.value?.message}</FormInputError>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label>Tipo</Label>
              <Select
                onValueChange={(val) =>
                  setValue(
                    "type",
                    val as "ganho" | "despesa" | "investimento",
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
                <SelectContent className="w-full">
                  <SelectItem value="ganho">Ganho</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                  <SelectItem value="investimento">Investimento</SelectItem>
                </SelectContent>
              </Select>
              <FormInputError>{errors.type?.message}</FormInputError>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Data</Label>
            <Input type="date" {...register("date", { valueAsDate: true })} />
            <FormInputError>{errors.date?.message}</FormInputError>
          </div>
          <div className="flex w-full gap-3">
            <div className="flex flex-col gap-1 w-full">
              <Label>Banco</Label>
              <Select
                onValueChange={(val) =>
                  setValue("bank", val as unknown as number)
                }
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
            <Label>Parcelas</Label>
            <Input
              type="number"
              defaultValue={1}
              {...register("installments", { valueAsNumber: true })}
            />
            <FormInputError>{errors.installments?.message}</FormInputError>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Categoria</Label>
            <Select
              onValueChange={(value) =>
                setValue("category", value as unknown as number)
              }
              {...register("category", { valueAsNumber: true })}
              defaultValue="0"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value={"0"}>Sem categoria</SelectItem>
                {categories.data?.map((category) => (
                  <SelectItem key={category.id} value={`${category.id}`}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormInputError>{errors.category?.message}</FormInputError>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="button-secondary">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
