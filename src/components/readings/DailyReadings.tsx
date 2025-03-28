
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, BookmarkCheck, Calendar } from "lucide-react";
import { getDailyReadings } from "@/services/readings-service";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { useToast } from "@/hooks/use-toast";

interface Reading {
  title: string;
  citation: string;
  text: string;
}

interface DailyReadingsData {
  date: string;
  liturgicalDay: string;
  liturgicalColor: string;
  readings: Reading[];
}

const DailyReadings = () => {
  const [readingsData, setReadingsData] = useState<DailyReadingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addBookmark, hasBookmark, removeBookmark } = useBookmarks();
  const { toast } = useToast();

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDailyReadings();
        setReadingsData(data);
      } catch (err) {
        console.error("Failed to fetch daily readings:", err);
        setError("Failed to load daily readings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReadings();
  }, []);

  const handleBookmarkReading = (reading: Reading) => {
    const readingReference = `reading-${reading.citation.replace(/\s+/g, '-').toLowerCase()}`;
    const isBookmarked = hasBookmark(readingReference);
    
    if (isBookmarked) {
      // Find the bookmark to remove
      const bookmarkIds = document.querySelectorAll(`[data-reference="${readingReference}"]`);
      if (bookmarkIds.length > 0) {
        const id = bookmarkIds[0].getAttribute('data-id');
        if (id) removeBookmark(id);
      }
      
      toast({
        title: "Reading Removed",
        description: `${reading.title} has been removed from your bookmarks.`,
      });
    } else {
      // Create content preview
      let contentPreview = reading.text;
      if (contentPreview.length > 100) {
        contentPreview = contentPreview.substring(0, 97) + "...";
      }
      
      addBookmark({
        type: "reading",
        title: reading.title,
        subtitle: reading.citation,
        reference: readingReference,
        content: contentPreview
      });
      
      toast({
        title: "Reading Saved",
        description: `${reading.title} has been saved to your bookmarks.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-display">Today's Mass Readings</h2>
      </div>

      {loading && (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading daily readings...</p>
        </div>
      )}

      {error && (
        <div className="py-10 text-center">
          <p className="text-destructive">{error}</p>
        </div>
      )}

      {!loading && !error && readingsData && (
        <>
          <Card className="overflow-hidden">
            <div 
              className="h-2" 
              style={{ backgroundColor: readingsData.liturgicalColor === "green" 
                ? "#2A6E3F" 
                : readingsData.liturgicalColor === "red" 
                ? "#AA2E25" 
                : readingsData.liturgicalColor === "purple" 
                ? "#5D1A7F" 
                : readingsData.liturgicalColor === "white" 
                ? "#D4AF37" 
                : "#0047AB" 
              }} 
            />
            <CardHeader>
              <CardTitle>{readingsData.liturgicalDay}</CardTitle>
              <CardDescription>{readingsData.date}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {readingsData.readings.map((reading, index) => {
                const readingReference = `reading-${reading.citation.replace(/\s+/g, '-').toLowerCase()}`;
                const isBookmarked = hasBookmark(readingReference);
                
                return (
                  <div key={index} className="space-y-2" data-reference={readingReference}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{reading.title}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleBookmarkReading(reading)}
                        className="h-8 px-2"
                      >
                        {isBookmarked ? 
                          <BookmarkCheck className="h-4 w-4 text-primary" /> : 
                          <Bookmark className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{reading.citation}</p>
                    <div className="bible-text mt-2">
                      {reading.text}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default DailyReadings;
