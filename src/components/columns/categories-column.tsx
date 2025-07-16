import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EditCategoryForm } from "../forms/categories/edit-category-form";
import { useState } from "react";
import { DeleteCategoryForm } from "../forms/categories/delete-category-form";
import { Category } from "../../types/category";

function getTextColor(bgColor: string) {
  // Converte hex para RGB e calcula o brilho
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "text-black" : "text-white";
}

export const categoriesColumns: ColumnDef<Category>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="uppercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => {
      const color = row.getValue("color") as string;
      const textColorClass = getTextColor(color);
      return (
        <div
          // className={`uppercase w-fit px-4 py-0.5 rounded-full `}
          className={`uppercase w-fit px-4 py-0.5 rounded-full ${textColorClass}`}
          style={{ backgroundColor: `${color}` }}
        >
          {row.getValue("color")}
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
            {/* <DropdownMenuLabel>Ações</DropdownMenuLabel> */}
            <EditCategoryForm row={row} />
            <DeleteCategoryForm row={row} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
