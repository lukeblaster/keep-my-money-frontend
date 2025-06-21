import { TransactionsContainer } from "@/components/containers/transactions-container";

export default async function Page({
  params,
}: {
  params: Promise<{
    year: number;
    month_name: string;
  }>;
}) {
  const { year, month_name } = await params;

  return (
    <div className="flex flex-col gap-5">
      <TransactionsContainer year={year} month_name={month_name} />
    </div>
  );
}
