import { MonthsContainer } from "../../../../components/containers/months-container";

export default async function Page({
  params,
}: {
  params: Promise<{
    year: number;
  }>;
}) {
  const { year } = await params;

  return (
    <div className="flex flex-col gap-5">
      <MonthsContainer year={year} />
    </div>
  );
}
