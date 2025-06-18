"use client";
import { deleteTransactionOnMonth } from "@/api/transactions/delete-transaction-month";
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
import { Row } from "@tanstack/react-table";
import { AxiosResponse } from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const deleteTransactionSchema = z.object({
  id: z.number(),
});

type DeleteTransactionFormData = z.infer<typeof deleteTransactionSchema>;

export function DeleteEntityForm({
  row,
  role,
}: {
  row: Row<any>;
  role: string;
  action: Promise<AxiosResponse<any, any>>;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const transactionOnMonth = row.getValue("TransactionOnMonth") as any[];
  const {} = useForm<DeleteTransactionFormData>({
    resolver: zodResolver(deleteTransactionSchema),
    defaultValues: {
      id: transactionOnMonth[0].id,
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className="flex items-center gap-1">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setTimeout(() => setOpenDialog(true), 0);
          }}
        >
          <Trash className="text-black" />
          Excluir
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            Deseja excluir a {role} {row.getValue("name")}?
          </DialogTitle>
          <DialogDescription>Esta ação é irreversível</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button type="submit">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" variant="destructive">
              Excluir
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
