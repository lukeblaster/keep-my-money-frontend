import { RegisterForm } from "../form/register";

export function RegisterMobileView() {
  return (
    <div className="md:hidden flex flex-col h-screen items-center justify-center p-3 bg-[url(/images/pexels-mateusz-dach-99805-1055081.jpg)] bg-cover">
      <div className="flex flex-col z-10 w-full max-w-[430px] bg-background gap-4 justify-center py-10 px-5 rounded-xl">
        <div className="leading-4">
          <p className="font-bold">
            keep my <span className="text-primary">money</span> 💸
          </p>
          <span className="text-primary-foreground font-semibold text-[12px]">
            controle financeiro
          </span>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
