import { redirect } from "next/navigation";

export default function Home() {
  redirect("/painel/dashboard");
  return <div></div>;
}
