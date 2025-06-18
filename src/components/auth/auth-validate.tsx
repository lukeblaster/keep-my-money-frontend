import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function AuthValidate() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");

  if (!auth) {
    redirect("/login?credentials=false");
  }
  return <></>;
}
