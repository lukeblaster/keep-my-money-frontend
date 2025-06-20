"use client";
import { deleteTransactionOnMonth } from "@/api/transactions/delete-transaction-month";
import { TransactionOnMonth } from "@/components/columns/transactions-columns";
import { FormInputError } from "@/components/errors/form-input-error";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const deleteTransactionSchema = z.object({
  id: z.number(),
});

type DeleteTransactionFormData = z.infer<typeof deleteTransactionSchema>;

export function DeleteTransactionOnMonthForm({
  row,
  role,
}: {
  row: Row<any>;
  role: string;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const transactionOnMonth = row.getValue(
    "TransactionOnMonth"
  ) as TransactionOnMonth[];
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteTransactionFormData>({
    resolver: zodResolver(deleteTransactionSchema),
    defaultValues: {
      id: transactionOnMonth[0].id,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTransactionOnMonth,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success(response.data.message);
    },
  });

  const onSubmit: SubmitHandler<DeleteTransactionFormData> = (data) => {
    const props = {
      id: transactionOnMonth[0].id,
    };
    const response = mutation.mutate({ props: props });

    return response;
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className="flex items-center gap-1 w-full">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setTimeout(() => setOpenDialog(true), 0);
          }}
          className="w-full"
        >
          <Trash className="text-black" />
          Excluir
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            Deseja excluir a {role} {row.getValue("description")}?
          </DialogTitle>
          <DialogDescription>Esta ação é irreversível</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputError>{errors.id?.message}</FormInputError>
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
    </Dialog>
  );
}
