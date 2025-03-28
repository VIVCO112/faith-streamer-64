
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Search, Book } from "lucide-react";
import { bibleBooks } from "@/data/bible-data";

interface BibleNavigatorProps {
  currentBook?: string;
  currentChapter?: number;
}

const BibleNavigator = ({ currentBook, currentChapter }: BibleNavigatorProps) => {
  const navigate = useNavigate();
  const [openBook, setOpenBook] = useState(false);
  const [openChapter, setOpenChapter] = useState(false);
  const [selectedBook, setSelectedBook] = useState(currentBook || "Genesis");
  const [selectedChapter, setSelectedChapter] = useState(currentChapter || 1);

  const book = bibleBooks.find(b => b.name === selectedBook);
  const chapterCount = book ? book.chapters : 50;
  const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);

  const handleBookSelect = (bookName: string) => {
    setSelectedBook(bookName);
    setOpenBook(false);
    
    // If we changed the book, reset to chapter 1
    if (bookName !== selectedBook) {
      setSelectedChapter(1);
      navigate(`/bible/${encodeURIComponent(bookName)}/1`);
    }
  };

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    setOpenChapter(false);
    navigate(`/bible/${encodeURIComponent(selectedBook)}/${chapter}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <Popover open={openBook} onOpenChange={setOpenBook}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openBook}
            className="justify-between sm:w-[200px]"
          >
            <Book className="mr-2 h-4 w-4" />
            {selectedBook}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search book..." />
            <CommandEmpty>No book found.</CommandEmpty>
            <CommandList className="max-h-[300px]">
              <CommandGroup>
                {bibleBooks.map((book) => (
                  <CommandItem
                    key={book.name}
                    value={book.name}
                    onSelect={() => handleBookSelect(book.name)}
                  >
                    {book.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openChapter} onOpenChange={setOpenChapter}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openChapter}
            className="justify-between w-[110px]"
          >
            Chapter {selectedChapter}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Go to chapter..." />
            <CommandEmpty>No chapter found.</CommandEmpty>
            <CommandList className="max-h-[300px]">
              <CommandGroup>
                {chapters.map((chapter) => (
                  <CommandItem
                    key={chapter}
                    value={chapter.toString()}
                    onSelect={() => handleChapterSelect(chapter)}
                  >
                    Chapter {chapter}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button variant="ghost" size="icon" className="ml-auto">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default BibleNavigator;
