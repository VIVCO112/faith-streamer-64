
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeProvider } from "../core/ThemeProvider";
import { useEffect, useState } from "react";

const Layout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("page-transition-enter");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("page-transition-exit-active");
      
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("page-transition-enter");
      }, 300);
      
      return () => clearTimeout(timeout);
    }
    
    const enterTimeout = setTimeout(() => {
      setTransitionStage("page-transition-enter-active");
    }, 10);
    
    return () => clearTimeout(enterTimeout);
  }, [location, displayLocation]);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen">
        {!isMobile && <Sidebar />}
        <main className="flex-1 overflow-auto pb-16 pt-2">
          <div className={`container max-w-4xl ${transitionStage}`}>
            <Outlet />
          </div>
        </main>
        {isMobile && <MobileNav />}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
