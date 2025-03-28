
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  Home, 
  HandHeart, 
  Bot,
  Menu,
  Bookmark,
  Settings,
  X
} from "lucide-react";
import { useTheme } from "../core/ThemeProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";

interface MobileNavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const MobileNavItem = ({ icon, label, to, active }: MobileNavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center flex-1 pt-3 pb-2 transition-all duration-300",
        active ? "text-primary scale-110" : "text-muted-foreground"
      )}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
      {active && <span className="h-1 w-6 bg-primary rounded-full mt-1 animate-fade-in"></span>}
    </Link>
  );
};

const MobileNav = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed bottom-0 left-0 right-0 bg-card border-t h-16 flex items-center z-10 transition-all duration-300",
        scrolled ? "shadow-lg" : ""
      )}>
        <MobileNavItem 
          icon={<Home size={20} />} 
          label="Home" 
          to="/" 
          active={location.pathname === "/"} 
        />
        <MobileNavItem 
          icon={<BookOpen size={20} />} 
          label="Bible" 
          to="/bible" 
          active={location.pathname.startsWith("/bible")} 
        />
        <MobileNavItem 
          icon={<Calendar size={20} />} 
          label="Readings" 
          to="/readings" 
          active={location.pathname.startsWith("/readings")} 
        />
        <MobileNavItem 
          icon={<HandHeart size={20} />} 
          label="Prayers" 
          to="/prayers" 
          active={location.pathname.startsWith("/prayers")} 
        />
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex flex-col items-center justify-center flex-1 pt-3 pb-2 h-full">
              <Menu size={20} />
              <span className="text-xs mt-1 font-medium">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-72 rounded-t-xl border-t-primary">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-lg text-primary">More Options</h3>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X size={18} />
                </Button>
              </SheetClose>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <Link 
                to="/assistant" 
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border hover-lift"
              >
                <Bot size={24} className="mb-1 text-primary" />
                <span className="text-sm">Assistant</span>
              </Link>
              <Link 
                to="/bookmarks" 
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border hover-lift"
              >
                <Bookmark size={24} className="mb-1 text-accent" />
                <span className="text-sm">Bookmarks</span>
              </Link>
              <Link 
                to="/settings" 
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border hover-lift"
              >
                <Settings size={24} className="mb-1 text-secondary" />
                <span className="text-sm">Settings</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
};

export default MobileNav;
