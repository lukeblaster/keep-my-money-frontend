"use client";
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
import { Row } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { updateCategory } from "@/api/category/update-category";
import { Category } from "@/types/category";
import { toast } from "sonner";
import { ApiError } from "@/types/error";

const editTransactionSchema = z.object({
  name: z.string().min(3, { message: "São necessários 3 ou mais caracteres." }),
  color: z.string().min(4, { message: "Informe uma cor válida" }),
});

type EditTransactionFormData = z.infer<typeof editTransactionSchema>;

export function EditCategoryForm({ row }: { row: Row<Category> }) {
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTransactionFormData>({
    resolver: zodResolver(editTransactionSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpenDialog(false);
      toast.success(response.data.message);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<EditTransactionFormData> = (data) => {
    return mutation.mutate({
      props: {
        id: row.getValue("id"),
        name: data.name,
        color: data.color,
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
          <Pencil className="text-black" /> Editar categoria
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 mb-1">
            <div className="flex flex-col gap-1">
              <Label>Nome da categoria</Label>
              <Input
                defaultValue={row.getValue("name")}
                {...register("name")}
              />
              <p className="text-sm text-red-600">{errors.name?.message}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Cor</Label>
              <Input
                type="color"
                defaultValue={row.getValue("color")}
                {...register("color")}
              />
              <p className="text-sm text-red-600">{errors.color?.message}</p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              type="submit"
              variant="default"
              disabled={mutation.isPending}
            >
              Atualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
