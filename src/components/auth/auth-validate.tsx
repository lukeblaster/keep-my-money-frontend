import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function AuthValidate() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");
  const user = cookieStore.get("user");

  // if (!auth || !user) {
  //   redirect("/login");
  // }
  return <></>;
}
