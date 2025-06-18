"use client";
import { createBank } from "@/api/banks/create-bank";
import { FormInputError } from "@/components/errors/form-input-error";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateBankAccountInput,
  CreateBankAccountSchema,
} from "@/schema/bank-account";
import { ApiError } from "@/types/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function AddBankAccountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBankAccountInput>({
    resolver: zodResolver(CreateBankAccountSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBank,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["bank-accounts"],
      });
      toast.success(response.data.message);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<CreateBankAccountInput> = (data) => {
    const props = {
      name: data.name,
    };

    return mutation.mutate(props);
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <Label>Nome</Label>
        <Input type="text" {...register("name")} />
        <FormInputError>{errors.name?.message}</FormInputError>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant="outline"
            className="items-center cursor-pointer mb-1.5"
          >
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" className="items-center cursor-pointer mb-1.5">
            Adicionar
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
}
