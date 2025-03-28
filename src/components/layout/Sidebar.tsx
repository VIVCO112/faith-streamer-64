
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  Home, 
  HandHeart, 
  BookMarked, 
  Bot, 
  Settings,
  Sun,
  Moon,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "../core/ThemeProvider";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, to, active }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "nav-item",
        active && "active"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const themeIcon = {
    light: <Sun size={18} />,
    dark: <Moon size={18} />,
    sepia: <BookOpen size={18} />
  };

  const nextTheme = {
    light: "dark",
    dark: "sepia",
    sepia: "light"
  };

  return (
    <aside className="w-64 border-r p-4 flex flex-col h-screen">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <BookOpen size={16} className="text-primary-foreground" />
        </div>
        <h1 className="font-display text-xl">Faith Streamer</h1>
      </div>
      
      <nav className="space-y-1 flex-1">
        <SidebarItem 
          icon={<Home size={18} />} 
          label="Home" 
          to="/" 
          active={location.pathname === "/"} 
        />
        <SidebarItem 
          icon={<BookOpen size={18} />} 
          label="Bible" 
          to="/bible" 
          active={location.pathname.startsWith("/bible")} 
        />
        <SidebarItem 
          icon={<Calendar size={18} />} 
          label="Daily Readings" 
          to="/readings" 
          active={location.pathname.startsWith("/readings")} 
        />
        <SidebarItem 
          icon={<HandHeart size={18} />} 
          label="Prayers" 
          to="/prayers" 
          active={location.pathname.startsWith("/prayers")} 
        />
        <SidebarItem 
          icon={<Bot size={18} />} 
          label="Bible Assistant" 
          to="/assistant" 
          active={location.pathname.startsWith("/assistant")} 
        />
        <SidebarItem 
          icon={<Bookmark size={18} />} 
          label="Bookmarks" 
          to="/bookmarks" 
          active={location.pathname.startsWith("/bookmarks")} 
        />
      </nav>
      
      <div className="space-y-2 mt-auto">
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={() => setTheme(nextTheme[theme] as "light" | "dark" | "sepia")}
        >
          {themeIcon[theme]}
          <span className="ml-2 capitalize">{theme} Mode</span>
        </Button>
        <SidebarItem 
          icon={<Settings size={18} />} 
          label="Settings" 
          to="/settings" 
          active={location.pathname === "/settings"} 
        />
      </div>
    </aside>
  );
};

export default Sidebar;
