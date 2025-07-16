import { useCategoryData } from "../../hooks/query/use-category-data";
import { categoriesColumns } from "../columns/categories-column";
import { AddCategoryForm } from "../forms/categories/add-category-form";
import { DataTable } from "../tables/data-table";

export const CategoriesContainer = () => {
  const { data: categories } = useCategoryData();
  return (
    <div>
      {" "}
      <DataTable
        columns={categoriesColumns}
        data={categories ?? []}
        filter="name"
        addButton={<AddCategoryForm />}
      />
    </div>
  );
};
