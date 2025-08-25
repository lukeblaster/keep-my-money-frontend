import { Input } from "@/components/ui/input";
import { extractTransactions } from "@/utils/extract-transactions";
import { Upload } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/store/hooks";
import {
  setTransactions,
  TransactionState,
} from "@/store/features/transactions.store";

export const UploadFile = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<string>>;
}) => {
  const [fileName, setFileName] = useState("");
  const dispatch = useAppDispatch();

  // Handler para o evento de mudança do input de arquivo
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const selectedFileName = file?.name || "Escolher arquivo...";
    const fileString = await file?.text();

    const transactions = await extractTransactions({ fileString: fileString });
    console.log(transactions);
    dispatch(setTransactions(transactions as unknown as TransactionState[]));
    setFileName(selectedFileName);
    setStep("form");
  };

  return (
    <div>
      <Label
        htmlFor="file-input"
        className="h-60 border-2 border-dashed rounded border-gray-300 flex flex-col space-y-4 items-center justify-center"
      >
        <Upload className="rounded-full border p-2 size-10" />
        <div className="flex flex-col space-y-2 text-center">
          <span>Clique para selecionar o arquivo desejado</span>
          <span className="text-xs text-muted-foreground">
            Arquivos suportados: .OFX
          </span>
          <span className="text-sm">{fileName ? fileName : ""}</span>
        </div>
      </Label>
      <Input
        id="file-input"
        type="file"
        accept=".ofx"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
