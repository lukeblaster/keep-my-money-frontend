"use client";
import { updateBankAccount } from "@/api/banks/update-bank";
import { FormInputError } from "@/components/errors/form-input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UpdateBankAccountInput,
  UpdateBankAccountSchema,
} from "@/schema/bank-account";
import { ApiError } from "@/types/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function EditBankAccount({
  props,
  setIsEditing,
}: {
  props: UpdateBankAccountInput;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBankAccountInput>({
    resolver: zodResolver(UpdateBankAccountSchema),
    defaultValues: {
      id: props.id,
      name: props.name,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateBankAccount,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["bank-accounts", props.id] });
      setIsEditing(false);
      toast.success(response.data.message);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<UpdateBankAccountInput> = (data) => {
    const props = {
      id: data.id,
      name: data.name,
    };

    return mutation.mutate(props);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 items-end">
      <div className="flex flex-col gap-1">
        <Label>Nome</Label>
        <Input defaultValue={props.name} {...register("name")} />
        <FormInputError>{errors.name?.message}</FormInputError>
      </div>
      <Button type="submit" className="mb-1">
        Atualizar
      </Button>
    </form>
  );
}
