import { DashboardResumeContainer } from "@/components/containers/dashboard-resume-container";
export default async function Home() {
  return (
    <section className="flex flex-col gap-3 rounded-xl">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-semibold">Olá! 💸</h2>
          <p className="text-neutral-600">Seja bem-vindo(a) ao seu dashboard</p>
        </div>
      </div>
      <DashboardResumeContainer />
    </section>
  );
}
