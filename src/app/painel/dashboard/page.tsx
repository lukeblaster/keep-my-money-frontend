import { DashboardResumeContainer } from "@/components/containers/dashboard-resume-container";
export default async function Home() {
  return (
    <section className="flex flex-col gap-3 rounded-xl">
      <DashboardResumeContainer />
    </section>
  );
}
