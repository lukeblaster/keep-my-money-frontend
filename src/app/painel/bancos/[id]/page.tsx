import { PaymentsWrapper } from "../../../../components/wrappers/payments-wrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-5">
      <PaymentsWrapper id={id} />
    </div>
  );
}
