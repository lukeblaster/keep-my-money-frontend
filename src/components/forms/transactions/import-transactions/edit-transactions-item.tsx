import {
  toggleShouldImport,
  TransactionState,
  updateTransaction,
} from "@/store/features/transactions.store";
import { useAppDispatch } from "@/store/hooks";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction, useState } from "react";
import { Pencil, Save } from "lucide-react";
import { Input } from "@/components/ui/input";

export const EditTransactionsItem = ({
  transaction,
}: {
  transaction: TransactionState;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <>
      {isEditing ? (
        <TransactionEdit
          setIsEditing={setIsEditing}
          transaction={transaction}
        />
      ) : (
        <tr className="h-10 text-sm">
          <td>
            <Checkbox
              checked={transaction.shouldImport}
              onCheckedChange={() =>
                dispatch(toggleShouldImport(transaction.id))
              }
            />
          </td>
          <td className="w-full">{transaction.name}</td>
          <td className="min-w-24">{transaction.type.toUpperCase()}</td>
          <td className="min-w-36">{transaction.date}</td>
          <td className="min-w-28">
            {Number(transaction.finalValue).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </td>
          <td>
            <Pencil
              size={18}
              className="text-muted-foreground"
              onClick={() => setIsEditing(true)}
            />
          </td>
        </tr>
      )}
    </>
  );
};

const TransactionEdit = ({
  transaction,
  setIsEditing,
}: {
  transaction: TransactionState;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState(transaction.name);
  const [type, setType] = useState(transaction.type);
  const [date, setDate] = useState(transaction.date);
  const [finalValue, setFinalValue] = useState(transaction.finalValue);
  const dispatch = useAppDispatch();
  return (
    <tr className="text-sm">
      <td>
        <Checkbox
          checked={transaction.shouldImport}
          onCheckedChange={() => dispatch(toggleShouldImport(transaction.id))}
        />
      </td>
      <td className="w-full">
        <Input
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </td>
      <td className="max-w-20">
        <Input defaultValue={type.toUpperCase()} disabled type="text" />
      </td>
      <td className="max-w-36">
        <Input
          defaultValue={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />
      </td>
      <td className="max-w-28">
        <Input
          defaultValue={finalValue}
          onChange={(e) => setFinalValue(Number(e.target.value))}
        />
      </td>
      <td>
        <Save
          onClick={() => {
            dispatch(
              updateTransaction({
                id: transaction.id,
                finalValue: finalValue,
                date: date,
                name: name,
                shouldImport: transaction.shouldImport,
                type: transaction.type,
              })
            );
            setIsEditing(false);
          }}
          size={20}
        />
      </td>
    </tr>
  );
};
