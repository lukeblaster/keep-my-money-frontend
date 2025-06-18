"use client";
import { deleteBank } from "@/api/banks/delete-bank";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DeleteBankAccountInput,
  DeleteBankAccountSchema,
} from "@/schema/bank-account";
import { ApiError } from "@/types/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function DeleteBankAccount(props: DeleteBankAccountInput) {
  const { register, handleSubmit } = useForm<DeleteBankAccountInput>({
    resolver: zodResolver(DeleteBankAccountSchema),
    defaultValues: {
      id: props.id,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBank,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["banks-accounts"] });
      document.location.href = "/painel/bancos";
      toast.success(response.data.message);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<DeleteBankAccountInput> = (data) => {
    const props = {
      id: data.id,
    };

    return mutation.mutate(props);
  };
  return (
    <DialogContent className="w-96">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Deseja excluir o item?</DialogTitle>
          <DialogDescription>Esta ação é irreversível</DialogDescription>
        </DialogHeader>
        <Input
          className="hidden"
          {...register("id", { valueAsNumber: true })}
          defaultValue={props.id}
        />
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button type="submit" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive">
            Excluir
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
