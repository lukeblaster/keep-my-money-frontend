import { redirect } from "next/navigation";
import { DashboardResumeContainer } from "../../../components/containers/dashboard-resume-container";
import { cookies } from "next/headers";
export default async function Home() {
  const cookieStore = await cookies();
  const userString = cookieStore.get("user");

  if (!userString) return redirect("/login");

  const user = JSON.parse(userString?.value || "");

  return (
    <section className="flex flex-col gap-3 rounded-xl">
      <div className="h-full flex justify-between items-end">
        <div>
          <h2 className="font-semibold">Olá, {user?.name}! 💸</h2>
          <p className="text-neutral-600">Seja bem-vindo(a) ao seu dashboard</p>
        </div>
      </div>
      <DashboardResumeContainer />
    </section>
  );
}
