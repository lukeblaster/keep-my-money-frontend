import { createPaymentMethod } from "@/api/payment-method/create-payment-method";
import { FormInputError } from "@/components/errors/form-input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiError } from "@/types/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const addPaymentMethodSchema = z.object({
  name: z
    .string({ required_error: "Informe um nome para a forma de pagamento" })
    .min(3, { message: "São necessários 3 ou mais caracteres." }),
  method: z
    .string({ required_error: "Selecione um tipo de pagamento." })
    .min(3, { message: "São necessários 3 ou mais caracteres." }),
});

type AddPaymentMethodFormData = z.infer<typeof addPaymentMethodSchema>;

export function AddPaymentForm({ bankAccountId }: { bankAccountId: number }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddPaymentMethodFormData>({
    resolver: zodResolver(addPaymentMethodSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPaymentMethod,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["bank-accounts", bankAccountId],
      });
      reset();
      toast.success(response.data.message);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<AddPaymentMethodFormData> = (data) => {
    const props = {
      name: data.name,
      method: data.method,
      bankAccountId: bankAccountId,
    };

    return mutation.mutate({ props: props });
  };
  return (
    <div className="flex flex-col gap-3">
      <form className="flex gap-3 items-end" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <Label>Nome</Label>
          <Input type="text" {...register("name")} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Tipo de pagamento</Label>
          <Select
            onValueChange={(val) =>
              setValue(
                "method",
                val as "pix" | "credit-card" | "debit-card" | "payment-slip",
                {
                  shouldValidate: true,
                }
              )
            }
            {...register("method")}
          >
            <SelectTrigger className="min-w-40">
              <SelectValue placeholder="Selecione um tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipos de pagamento</SelectLabel>
                <SelectItem value="pix">Pix</SelectItem>
                <SelectItem value="credit-card">Cartão de Crédito</SelectItem>
                <SelectItem value="debit-card">Cartão de Dédito</SelectItem>
                <SelectItem value="money">Dinheiro</SelectItem>
                <SelectItem value="payment-slip">Boleto</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button className="items-center cursor-pointer">
          <PlusCircle />
          Adicionar forma de pagamento
        </Button>
      </form>
      <FormInputError>
        {errors.name?.message || errors.method?.message}
      </FormInputError>
    </div>
  );
}
