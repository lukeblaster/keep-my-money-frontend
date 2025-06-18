import { LoginDesktopView } from "./components/LoginDesktopView";
import { LoginMobileView } from "./components/LoginMobileView";

export default function Page() {
  return (
    <>
      <LoginDesktopView />
      <LoginMobileView />
    </>
  );
}
