"use client";
import React from "react";
import { createMonths } from "@/api/months/create-year-months";
import { FormInputError } from "@/components/errors/form-input-error";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateYearMonthInput, CreateYearMonthsSchema } from "@/schema/year";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Info, PlusCircle } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ApiError } from "@/types/error";

export function AddYearMonthsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateYearMonthInput>({
    resolver: zodResolver(CreateYearMonthsSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createMonths,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["years"] });
      toast.success(response.data.message);
    },
    onError: (e: AxiosError) => {
      const error = e.response?.data as ApiError;
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<CreateYearMonthInput> = (data) => {
    const props = {
      year: data.year,
    };
    return mutation.mutate({ props: props });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="button-primary">
          <PlusCircle />
          Adicionar ano
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle onClick={() => toast.success("Sucesso")}>
            Adicionar novo ano
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex items-center gap-1 w-fit px-2 py-1 rounded bg-red-200 text-red-500 text-xs">
              <Info size={16} />
              <span>Não é possível excluir os anos criados</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Label>Ano</Label>
            <Input {...register("year", { valueAsNumber: true })} />
            <FormInputError>{errors.year?.message}</FormInputError>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="button-secondary">
                Salvar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
