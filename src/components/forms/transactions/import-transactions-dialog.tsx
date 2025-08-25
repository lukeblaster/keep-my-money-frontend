import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Upload } from "lucide-react";
import { useState } from "react";
import { UploadFile } from "./import-transactions/upload-file";
import { EditTransactions } from "./import-transactions/edit-transactions";

const IMPORT_STEPS = {
  UPLOAD: "upload",
  FORM: "form",
  SUCCESS: "success",
};

export const ImportTransactionDialog = ({
  month_name,
  year,
}: {
  month_name: string;
  year: number;
}) => {
  const [step, setStep] = useState("upload");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const renderContent = () => {
    switch (step) {
      case IMPORT_STEPS.UPLOAD:
        return <UploadFile setStep={setStep} />;
      case IMPORT_STEPS.FORM:
        return (
          <EditTransactions
            month_name={month_name}
            year={year}
            setIsDialogOpen={setIsDialogOpen}
            setStep={setStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={true}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-8">
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="text-sm"
              onClick={() => setIsDropdownOpen(false)}
            >
              <Upload /> Importar fatura
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="!max-w-[calc(100%-20rem)]">
        <DialogHeader>
          <DialogTitle>Importar fatura</DialogTitle>
          <DialogDescription>
            Importe suas compras da fatura de forma facilitada
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
