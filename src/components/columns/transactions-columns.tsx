"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TransactionCard } from "../cards/transaction-card";
import { EditTransactionForm } from "../forms/transactions/edit-transaction-form";
import { Category } from "@/types/category";
import { DeleteTransactionOnMonthForm } from "../forms/transactions/delete-transaction-month-form";
import { BankAccount } from "@/types/bank-account";
import { PaymentMethod } from "@/types/payment-method";

// export type TransactionType = "ganho" | "despesa" | "investimento";

// export type BankAccount = {
//   name: string;
// };

// export type PaymentMethodType = {
//   name: string;
// };

export type TransactionOnMonth = {
  id: number;
  transactionId: number;
  referenceMonthId: number;
  installment: number;
  value: number;
  paied: boolean;
  userId: number;
};

interface TransactionColumnsProps {
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

function getTextColor(bgColor: string) {
  // Converte hex para RGB e calcula o brilho
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "text-black" : "text-white";
}

export const transactionColumns: ColumnDef<TransactionColumnsProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className={`capitalize text-ellipsis overflow-hidden max-w-16`}>
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className={`capitalize text-ellipsis overflow-hidden max-w-36`}>
          {row.getValue("description")}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <div
          className={`capitalize text-center min-w-fit px-4 py-0.5 rounded-full`}
          style={
            type == "ganho"
              ? { backgroundColor: "#93ea86", color: "#000" }
              : type == "investimento"
              ? { backgroundColor: "#90d0f5", color: "#000" }
              : { backgroundColor: "#ff6d83", color: "#000" }
          }
        >
          {row.getValue("type")}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <div className={`capitalize `}>{date.toLocaleDateString("pt-BR")}</div>
      );
    },
  },

  {
    accessorKey: "installment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Parcelas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const installment = row.getValue("installment") as number;
      const installments = row.getValue("installments") as number;
      return (
        <div className={`capitalize`}>
          {installments > 1 ? `${installment} / ${installments}` : "única"}
        </div>
      );
    },
  },

  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 m-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = (row.getValue("category") as Category) || {
        name: "Sem categoria",
        color: "#dcdcdc",
      };
      const textColorClass = getTextColor(category.color);

      return (
        <div
          className={`text-center min-w-fit px-4 py-0.5 rounded-full ${textColorClass}`}
          style={{ backgroundColor: `${category.color}` }}
        >
          {category.name}
        </div>
      );
    },
  },
  {
    accessorKey: "installmentValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor da parcela
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const installmentValue = row.getValue("installmentValue") as number;
      return (
        <div className={`capitalize`}>
          {installmentValue.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "paied",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pago
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const TransactionOnMonth = row.getValue(
        "TransactionOnMonth"
      ) as TransactionOnMonth[];
      return (
        <div className={`capitalize`}>
          {TransactionOnMonth[0].paied ? `✅` : "❌"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Ações",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-neutral-50">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <TransactionCard row={row} />
            <EditTransactionForm row={row} />
            <DeleteTransactionOnMonthForm row={row} role="transação" />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "installments",
    header: "",
    cell: ({}) => {
      return <></>;
    },
  },
  {
    accessorKey: "finalValue",
    header: "",
    cell: ({}) => {
      return <></>;
    },
  },
  {
    accessorKey: "BankAccount",
    header: "",
    cell: ({}) => {
      return <></>;
    },
  },
  {
    accessorKey: "PaymentMethod",
    header: "",
    cell: ({}) => {
      return <></>;
    },
  },
  {
    accessorKey: "TransactionOnMonth",
    header: "",
    cell: ({}) => {
      return <></>;
    },
  },
];
