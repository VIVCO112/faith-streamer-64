
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  Home, 
  HandHeart, 
  Bot,
  Menu,
  Bookmark,
  Settings
} from "lucide-react";
import { useTheme } from "../core/ThemeProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { useState } from "react";

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
        "flex flex-col items-center justify-center flex-1 pt-3 pb-2",
        active ? "text-primary" : "text-muted-foreground"
      )}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

const MobileNav = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t h-16 flex items-center z-10">
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
              <span className="text-xs mt-1">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-72">
            <div className="grid grid-cols-3 gap-4 pt-6">
              <Link 
                to="/assistant" 
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border"
              >
                <Bot size={24} className="mb-1" />
                <span className="text-sm">Assistant</span>
              </Link>
              <Link 
                to="/bookmarks" 
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border"
              >
                <Bookmark size={24} className="mb-1" />
                <span className="text-sm">Bookmarks</span>
              </Link>
              <Link 
                to="/settings" 
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border"
              >
                <Settings size={24} className="mb-1" />
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
