
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeProvider } from "../core/ThemeProvider";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider>
      <div className="flex min-h-screen">
        {!isMobile && <Sidebar />}
        <main className="flex-1 overflow-auto pb-16 pt-2">
          <div className="container max-w-4xl">
            <Outlet />
          </div>
        </main>
        {isMobile && <MobileNav />}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
