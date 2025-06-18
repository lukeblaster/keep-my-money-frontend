import { RegisterForm } from "../form/register";
import { LoginBackgroundImage } from "./LoginBackgroundImage";

export function RegisterDesktopView() {
  return (
    <div className="hidden md:flex h-screen flex-col md:flex-row md:h-screen p-6 md:p-0">
      <div className="h-full">
        <LoginBackgroundImage />
      </div>
      <div
        className="flex flex-col z-10 h-full w-full max-w-[430px] max-h-[1000px] 
          md:ml-auto bg-background gap-5 justify-center p-6 rounded-xl"
      >
        <div className="leading-3.5">
          <p className="font-bold">
            keep my <span className="text-primary">money</span> 💸
          </p>
          <span className="text-primary-foreground font-semibold text-[12px]">
            app
          </span>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
