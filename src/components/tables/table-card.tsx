"use client";
import { AddMovimentationCaixinhaForm } from "../forms/caixinhas/add-movimentation-caixinha-form";
import { CaixinhaDataTable } from "./caixinha-data-table";
import { caixinhasColumns } from "../columns/caixinhas-columns";

const movimentacoes = [
  {
    id: 1,
    type: "Entrada",
    value: 199.9,
  },
  {
    id: 2,
    type: "Saída",
    value: 49.9,
  },
  {
    id: 3,
    type: "Entrada",
    value: 230.75,
  },
];

export function TableCard() {
  return (
    <div>
      <p>Histórico de movimentações</p>
      <CaixinhaDataTable
        data={movimentacoes}
        columns={caixinhasColumns}
        addButton={<AddMovimentationCaixinhaForm />}
      />
    </div>
  );
}
