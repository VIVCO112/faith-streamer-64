
import { useState, useEffect } from "react";
import { getVerseText } from "@/services/bible-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import ScriptureContext from "./ScriptureContext";

interface BibleReaderProps {
  book: string;
  chapter: number;
}

const EnhancedBibleReader = ({ book, chapter }: BibleReaderProps) => {
  const [verses, setVerses] = useState<Array<{ number: number; text: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState<string>("");

  useEffect(() => {
    const fetchVerses = async () => {
      setIsLoading(true);
      try {
        const data = await getVerseText(book, chapter);
        setVerses(data);
      } catch (error) {
        console.error("Error fetching verses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerses();
  }, [book, chapter]);

  const handleVerseClick = (verseNumber: number) => {
    const citation = `${book} ${chapter}:${verseNumber}`;
    setSelectedVerse(citation);
  };

  return (
    <Card className="bible-reader">
      <CardHeader>
        <CardTitle>
          {book} {chapter}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex">
                <Skeleton className="h-4 w-6 mr-4" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <ScrollArea className="h-[calc(100vh-350px)]">
              <div className="space-y-4 bible-text pr-4">
                {verses.map((verse) => (
                  <div 
                    key={verse.number} 
                    className="flex group"
                    onClick={() => handleVerseClick(verse.number)}
                  >
                    <span className="font-bold text-primary/70 mr-2 min-w-[1.5rem] text-right group-hover:text-primary transition-colors">
                      {verse.number}
                    </span>
                    <span className="flex-1 leading-relaxed group-hover:text-primary group-hover:bg-primary/5 transition-colors rounded px-1 cursor-pointer">
                      {verse.text}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {selectedVerse && <ScriptureContext citation={selectedVerse} />}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedBibleReader;
