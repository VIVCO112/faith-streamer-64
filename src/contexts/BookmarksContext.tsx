
import React, { createContext, useContext, useState, useEffect } from "react";

type BookmarkType = "bible" | "prayer" | "reading" | "catechism";

export interface Bookmark {
  id: string;
  type: BookmarkType;
  title: string;
  subtitle?: string;
  reference: string;
  content?: string;
  timestamp: number;
}

interface BookmarksContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id" | "timestamp">) => void;
  removeBookmark: (id: string) => void;
  hasBookmark: (reference: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error("Failed to parse bookmarks from localStorage", e);
        localStorage.removeItem("bookmarks");
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (newBookmark: Omit<Bookmark, "id" | "timestamp">) => {
    const id = `${newBookmark.type}-${newBookmark.reference}-${Date.now()}`;
    setBookmarks(prev => {
      // Don't add if already exists with same reference
      if (prev.some(b => b.reference === newBookmark.reference)) {
        return prev;
      }
      return [{...newBookmark, id, timestamp: Date.now()}, ...prev];
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const hasBookmark = (reference: string) => {
    return bookmarks.some(bookmark => bookmark.reference === reference);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, hasBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};
