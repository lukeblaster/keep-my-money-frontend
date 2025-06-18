"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilLine } from "lucide-react";
import { useState } from "react";

export function EditTargetForm() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <>
          <Input
            className="w-full max-w-72"
            defaultValue={`Meta de Investimento`}
          />
          <Button onClick={() => setIsEditing(false)}>Salvar</Button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold">Meta de Investimento</h3>
          <PencilLine
            size={20}
            className="cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        </>
      )}
    </>
  );
}
