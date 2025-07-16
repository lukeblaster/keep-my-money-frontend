import { YearsWrapper } from "../../../components/containers/years-container";
import { AddYearMonthsForm } from "../../../components/forms/year/add-year-months-form";

export default async function Page() {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg">Transações por ano</h3>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex justify-end">
          <AddYearMonthsForm />
        </div>
        <YearsWrapper />
      </div>
    </div>
  );
}
