"use client";
import { BankAccount } from "../../types/bank-account";
import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { AddPaymentForm } from "../forms/payment-forms/add-payment-form";
import { getBankById } from "../../api/banks/get-bank-id";
import { PaymentCard } from "../cards/payment-card";
import { PencilLine, Trash } from "lucide-react";
import { useState } from "react";
import { EditBankAccount } from "../forms/bank-account/edit-bank-account";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DeleteBankAccount } from "../forms/bank-account/delete-bank-account";

export function PaymentsWrapper({ id }: { id: string }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data } = useQuery<BankAccount[]>({
    queryKey: ["bank-accounts", Number(id)],
    queryFn: () => {
      const response = getBankById({ id: Number(id) });
      return response;
    },
  });
  const bank_data = data ?? ([] as BankAccount[]);
  const bank = bank_data[0];

  return (
    <>
      <div className="flex flex-col">
        <Breadcrumb className="mt-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/painel/bancos">
                Contas de Banco
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>{bank?.name}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-1 items-center">
        {isEditing ? (
          <EditBankAccount props={bank} setIsEditing={setIsEditing} />
        ) : (
          <>
            <h3 className="text-xl font-bold mr-2.5">{bank?.name}</h3>
            <PencilLine
              className="cursor-pointer"
              size={24}
              onClick={() => setIsEditing(!isEditing)}
            />
            <Dialog>
              <DialogTrigger>
                <Trash className="cursor-pointer" size={20} />
              </DialogTrigger>
              <DeleteBankAccount id={bank?.id} />
            </Dialog>
          </>
        )}
      </div>
      <div>
        <p>Meios de pagamento</p>
        <p className="text-zinc-500">
          Para cadastrar uma nova conta, preencha os campos a seguir e clique em
          “Adicionar”.
        </p>
      </div>
      <AddPaymentForm bankAccountId={bank?.id} />
      <div className="grid md:grid-cols-4 gap-3">
        {bank?.payment_methods?.map((paymentMethod) => (
          <PaymentCard key={paymentMethod.id} props={paymentMethod} />
        ))}
      </div>
    </>
  );
}
