import { AddBankAccountForm } from "../../../components/forms/bank-account/add-bank-account";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { BanksContainer } from "../../../components/containers/banks-container";

export default function Banks() {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-semibold text-xl">Contas de Banco</h3>
      <section className="flex flex-col">
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="items-center cursor-pointer">
                Adicionar
                <PlusCircle />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar nova conta de banco</DialogTitle>
                <DialogDescription>
                  Preencha os dados e clique em enviar
                </DialogDescription>
              </DialogHeader>
              <AddBankAccountForm />
            </DialogContent>
          </Dialog>
        </div>
        <BanksContainer />
      </section>
    </div>
  );
}
