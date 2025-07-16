"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useState } from "react";
import { TransactionRowAdapter } from "../../adapters/transaction-row-adapter";
import { BankAccount } from "../../types/bank-account";
import { Category } from "../../types/category";
import { PaymentMethod } from "../../types/payment-method";
import { TransactionOnMonth } from "../columns/transactions-columns";

interface TransactionCardProps {
  id: number;
  description: string;
  type: string;
  date: Date;
  paied: boolean;
  finalValue: number;
  installmentValue: number;
  installment: number;
  installments: number;
  category: Category;
  TransactionOnMonth: TransactionOnMonth[];
  BankAccount: BankAccount;
  PaymentMethod: PaymentMethod;
}

export function TransactionCard({ row }: { row: Row<TransactionCardProps> }) {
  const [openDialog, setOpenDialog] = useState(false);
  const transaction = TransactionRowAdapter({ row: row });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className="flex gap-1 items-center w-full">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setTimeout(() => setOpenDialog(true), 0);
          }}
          className="w-full"
        >
          <Eye className="text-black" />
          <p>Visualizar</p>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-start gap-1.5">
            <Eye size={20} />
            <p>Detalhes da transação</p>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-2xl">{row.getValue("description")}</p>
          </div>
          <div className="grid grid-cols-2 space-x-3 space-y-6">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Parcelas</p>
              <p className="text-sm">
                {transaction.installment} de {transaction.installments}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Categoria</p>
              <p className="text-sm">
                {transaction.category?.name || "Sem categoria"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Banco</p>
              <p className="text-sm">{transaction.BankAccount.name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Método de pagamento</p>
              <p className="text-sm">{transaction.PaymentMethod.name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Valor da parcela</p>
              <p className="text-sm">
                {transaction.installmentValue.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Valor final</p>
              <p className="text-sm">
                {transaction.finalValue.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </div>
        <DialogClose asChild>
          <Button>Fechar</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
