
// A service to fetch from a real Bible API
import { toast } from "sonner";

// Define your API key and base URL here
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key or load from environment
const BASE_URL = "https://api.scripture.api.bible/v1"; // Example API URL, replace with your actual API

export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleTranslation {
  id: string;
  name: string;
  abbreviation: string;
  language: string;
}

// Get available Bible translations
export const getBibleTranslations = async (): Promise<BibleTranslation[]> => {
  try {
    const response = await fetch(`${BASE_URL}/bibles`, {
      headers: {
        "api-key": API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.map((bible: any) => ({
      id: bible.id,
      name: bible.name,
      abbreviation: bible.abbreviation,
      language: bible.language.name
    }));
  } catch (error) {
    console.error("Failed to fetch Bible translations:", error);
    toast.error("Failed to load Bible translations");
    return [];
  }
};

// Default to a Catholic translation ID (you may want to make this configurable)
const DEFAULT_BIBLE_ID = "40072c4a624e8145-01"; // Example ID for NABRE, replace with your preferred translation

// Get verses for a specific book and chapter
export const getBibleVerses = async (
  book: string,
  chapter: number,
  bibleId: string = DEFAULT_BIBLE_ID
): Promise<BibleVerse[]> => {
  try {
    // Find the book ID first (you might need to implement this or use a lookup table)
    const bookId = await getBookId(book, bibleId);
    
    if (!bookId) {
      throw new Error(`Book "${book}" not found`);
    }
    
    const response = await fetch(`${BASE_URL}/bibles/${bibleId}/chapters/${bookId}.${chapter}/verses`, {
      headers: {
        "api-key": API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.map((verse: any) => ({
      number: parseInt(verse.number, 10),
      text: verse.text
    }));
  } catch (error) {
    console.error(`Failed to fetch verses for ${book} ${chapter}:`, error);
    toast.error(`Failed to load verses for ${book} ${chapter}`);
    
    // Fallback to mock data if API fails
    return import('./bible-service').then(mockService => 
      mockService.getVerseText(book, chapter)
    );
  }
};

// Helper function to get book ID
const getBookId = async (book: string, bibleId: string): Promise<string | null> => {
  try {
    const response = await fetch(`${BASE_URL}/bibles/${bibleId}/books`, {
      headers: {
        "api-key": API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    const foundBook = data.data.find((b: any) => 
      b.name.toLowerCase() === book.toLowerCase() || 
      b.abbreviation.toLowerCase() === book.toLowerCase()
    );
    
    return foundBook ? foundBook.id : null;
  } catch (error) {
    console.error("Failed to fetch book ID:", error);
    return null;
  }
};

// Search the Bible
export const searchBibleApi = async (
  query: string,
  bibleId: string = DEFAULT_BIBLE_ID
): Promise<{ citation: string; text: string }[]> => {
  try {
    const response = await fetch(`${BASE_URL}/bibles/${bibleId}/search?query=${encodeURIComponent(query)}`, {
      headers: {
        "api-key": API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.verses.map((verse: any) => ({
      citation: `${verse.reference}`,
      text: verse.text
    }));
  } catch (error) {
    console.error("Failed to search Bible:", error);
    toast.error("Failed to search the Bible");
    
    // Fallback to mock search if API fails
    return import('./bible-service').then(mockService => 
      mockService.searchBible(query)
    );
  }
};
