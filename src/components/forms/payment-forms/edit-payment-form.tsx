"use client";
import { updatePaymentMethod } from "../../../api/payment-method/update-payment-method";
import { FormInputError } from "../../errors/form-input-error";
import { Button } from "../../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { ApiError } from "../../../types/error";
import { PaymentMethod } from "../../../types/payment-method";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const editTransactionSchema = z.object({
  id: z.number(),
  name: z.string().min(3, { message: "São necessários 3 ou mais caracteres." }),
  method: z
    .string()
    .min(3, { message: "São necessários 3 ou mais caracteres." }),
});

type EditTransactionFormData = z.infer<typeof editTransactionSchema>;

export function EditPaymentForm({ props }: { props: PaymentMethod }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditTransactionFormData>({
    resolver: zodResolver(editTransactionSchema),
    defaultValues: {
      id: props.id,
      name: props.name,
      method: props.method,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatePaymentMethod,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      reset();
      toast.success(response.data.message);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<EditTransactionFormData> = (data) => {
    const props = {
      id: data.id,
      name: data.name,
      method: data.method,
    };

    return mutation.mutate({ props: props });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar meio de pagamento</DialogTitle>
        <DialogDescription>
          Atualize as informações e clique em Atualizar.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <Label>Nome</Label>
          <Input defaultValue={props.name} {...register("name")} />
          <FormInputError>{errors.name?.message}</FormInputError>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Tipo de pagamento</Label>
          <Select
            defaultValue={props.method}
            onValueChange={(val) =>
              setValue(
                "method",
                val as
                  | "pix"
                  | "credit-card"
                  | "debit-card"
                  | "cash"
                  | "payment-slip",
                {
                  shouldValidate: true,
                }
              )
            }
            {...register("method")}
          >
            <SelectTrigger className="min-w-full">
              <SelectValue placeholder="Selecione um tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipos de pagamento</SelectLabel>
                <SelectItem value="pix">Pix</SelectItem>
                <SelectItem value="credit-card">Cartão de Crédito</SelectItem>
                <SelectItem value="debit-card">Cartão de Dédito</SelectItem>
                <SelectItem value="cash">Dinheiro</SelectItem>
                <SelectItem value="payment-slip">Boleto</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" disabled={mutation.isPending}>
              Atualizar
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
