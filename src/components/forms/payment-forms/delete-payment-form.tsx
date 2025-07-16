"use client";
import { deletePaymentMethod } from "../../../api/payment-method/delete-payment-method";
import { Button } from "../../ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";
import { ApiError } from "../../../types/error";
import { PaymentMethod } from "../../../types/payment-method";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const deletePaymentMethodSchema = z.object({
  id: z.number(),
});

type DeletePaymentMethodFormData = z.infer<typeof deletePaymentMethodSchema>;

export function DeletePaymentForm({ props }: { props: PaymentMethod }) {
  const { handleSubmit } = useForm<DeletePaymentMethodFormData>({
    resolver: zodResolver(deletePaymentMethodSchema),
    defaultValues: {
      id: props.id,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePaymentMethod,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      toast.success(response.data.message);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<DeletePaymentMethodFormData> = (data) => {
    const props = {
      id: data.id,
    };

    return mutation.mutate({ props: props });
  };
  return (
    <DialogContent className="w-96">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Deseja excluir o item?</DialogTitle>
          <DialogDescription>Esta ação é irreversível</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button type="submit" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              variant="destructive"
              disabled={mutation.isPending}
            >
              Excluir
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
