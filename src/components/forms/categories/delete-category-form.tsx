"use client";
import { Button } from "../../ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Dialog,
  DialogTrigger,
} from "../../ui/dialog";
import { Row } from "@tanstack/react-table";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCategory } from "../../../api/category/delete-category";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Category } from "../../../types/category";
import { ApiError } from "../../../types/error";
import { toast } from "sonner";

const deleteTransactionSchema = z.object({
  id: z.number(),
});

type DeleteTransactionFormData = z.infer<typeof deleteTransactionSchema>;

export function DeleteCategoryForm({ row }: { row: Row<Category> }) {
  const [openDialog, setOpenDialog] = useState(false);
  const { register, handleSubmit } = useForm<DeleteTransactionFormData>({
    resolver: zodResolver(deleteTransactionSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpenDialog(false);
      toast.success(response.data.message);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<DeleteTransactionFormData> = (data) => {
    return mutation.mutate({
      props: {
        id: data.id,
      },
    });
  };

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open);
      }}
    >
      <DialogTrigger className="flex items-center gap-1">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setTimeout(() => setOpenDialog(true), 0);
          }}
        >
          <Trash className="text-black" />
          Excluir categoria
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            Deseja excluir a categoria {row.getValue("name")}?
          </DialogTitle>
          <DialogDescription>Esta ação é irreversível</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="hidden"
            {...register("id", { valueAsNumber: true })}
            defaultValue={row.getValue("id")}
          />
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
              disabled={mutation.isPending}
            >
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
