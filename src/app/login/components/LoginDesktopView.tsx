import { LoginForm } from "../form/login";
import { LoginBackgroundImage } from "./LoginBackgroundImage";

export function LoginDesktopView() {
  return (
    <div className="hidden md:flex h-screen flex-col md:flex-row md:h-screen p-6 md:p-0">
      <div className="h-full">
        <LoginBackgroundImage />
      </div>
      <div
        className="flex flex-col z-10 h-full w-full max-w-[430px] max-h-[1000px] 
          md:ml-auto bg-background gap-4 justify-center p-6 rounded-xl"
      >
        <div className="leading-4">
          <p className="font-bold">
            keep my <span className="text-primary">money</span> 💸
          </p>
          <span className="text-primary-foreground font-semibold text-[12px]">
            controle financeiro
          </span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
