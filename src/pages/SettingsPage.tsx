
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/core/ThemeProvider";
import { Sun, Moon, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { ApiKeyForm } from "@/components/settings/ApiKeyForm";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: "light" | "dark" | "sepia") => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      
      <ApiKeyForm />
      
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the app looks and feels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Theme</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={theme === "light" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => handleThemeChange("light")}
              >
                <Sun size={16} />
                Light
              </Button>
              <Button 
                variant={theme === "dark" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => handleThemeChange("dark")}
              >
                <Moon size={16} />
                Dark
              </Button>
              <Button 
                variant={theme === "sepia" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => handleThemeChange("sepia")}
              >
                <BookOpen size={16} />
                Sepia
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
          <CardDescription>Information about this application</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Faith Streamer is a Bible study and daily readings application designed to help you
            connect with scripture, prayers, and daily readings.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Version 1.0.0
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
