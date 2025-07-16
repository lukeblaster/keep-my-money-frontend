"use client";
import { CategoriesContainer } from "../../../components/containers/categories-container";

export default function Page() {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-semibold text-xl">Categorias</h3>
      <section className="flex flex-col">
        <CategoriesContainer />
      </section>
    </div>
  );
}
