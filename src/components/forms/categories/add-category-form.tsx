"use client";
import { createCategory } from "../../../api/category/create-category";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ApiError } from "../../../types/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const addTransactionSchema = z.object({
  name: z.string().min(3, { message: "São necessários 3 ou mais caracteres." }),
  color: z.string().min(4, { message: "Informe uma cor válida" }),
});

type AddTransactionFormData = z.infer<typeof addTransactionSchema>;

export function AddCategoryForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTransactionFormData>({
    resolver: zodResolver(addTransactionSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(response.data.message);
      reset();
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<AddTransactionFormData> = (data) => {
    setIsDialogOpen(false);
    const props = {
      name: data.name,
      color: data.color,
    };
    return mutation.mutate({ props: props });
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="items-center cursor-pointer">
            Adicionar
            <PlusCircle />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar nova categoria</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 mb-1">
              <div className="flex flex-col gap-1">
                <Label>Nome da categoria</Label>
                <Input {...register("name")} />
                <p className="text-sm text-red-600">{errors.name?.message}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Cor</Label>
                <Input type="color" {...register("color")} />
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
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
