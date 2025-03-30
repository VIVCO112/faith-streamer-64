
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BiblePage from "./pages/BiblePage";
import PrayersPage from "./pages/PrayersPage";
import ReadingsPage from "./pages/ReadingsPage";
import BookmarksPage from "./pages/BookmarksPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import React from "react";
import { BookmarksProvider } from "./contexts/BookmarksContext";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BookmarksProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/bible" element={<BiblePage />} />
                  <Route path="/bible/:book/:chapter" element={<BiblePage />} />
                  <Route path="/prayers" element={<PrayersPage />} />
                  <Route path="/readings" element={<ReadingsPage />} />
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </BrowserRouter>
        </BookmarksProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
