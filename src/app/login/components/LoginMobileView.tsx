import { LoginForm } from "../form/login";

export function LoginMobileView() {
  return (
    <div className="md:hidden flex flex-col h-screen items-center justify-center p-3 bg-[url(/pexels-campo-2.jpg)] bg-cover">
      <div className="flex flex-col z-10 w-full max-w-[430px] bg-background gap-4 justify-center py-10 px-5 rounded-xl">
        <div className="leading-3.5">
          <p className="font-bold">keep my <span className="text-primary">money</span> 💸</p>
          <span className="text-primary font-semibold text-[12px]">app</span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
