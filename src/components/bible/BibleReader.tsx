
import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Share2, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getVerseText } from "@/services/bible-service";
import { cn } from "@/lib/utils";
import { useBookmarks } from "@/contexts/BookmarksContext";

interface BibleReaderProps {
  book: string;
  chapter: number;
}

interface Verse {
  number: number;
  text: string;
}

const BibleReader = ({ book, chapter }: BibleReaderProps) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(18);
  const { toast } = useToast();
  const { addBookmark, hasBookmark, removeBookmark } = useBookmarks();
  
  const bookmarkReference = `${book} ${chapter}`;
  const isBookmarked = hasBookmark(bookmarkReference);

  useEffect(() => {
    const fetchChapterText = async () => {
      try {
        setLoading(true);
        setError(null);
        const chapterText = await getVerseText(book, chapter);
        setVerses(chapterText);
      } catch (err) {
        console.error("Failed to fetch Bible text:", err);
        setError("Failed to load chapter. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChapterText();
  }, [book, chapter]);

  const handleBookmark = () => {
    if (isBookmarked) {
      // Find the bookmark to remove
      const bookmarkIds = document.querySelectorAll(`[data-reference="${bookmarkReference}"]`);
      if (bookmarkIds.length > 0) {
        const id = bookmarkIds[0].getAttribute('data-id');
        if (id) removeBookmark(id);
      }
      
      toast({
        title: "Bookmark Removed",
        description: `${book} ${chapter} has been removed from your bookmarks.`
      });
    } else {
      // Create content preview from first verses (limited to ~100 chars)
      let contentPreview = "";
      if (verses.length > 0) {
        contentPreview = verses.slice(0, 2).map(v => v.text).join(" ");
        if (contentPreview.length > 100) {
          contentPreview = contentPreview.substring(0, 97) + "...";
        }
      }
      
      addBookmark({
        type: "bible",
        title: `${book} ${chapter}`,
        subtitle: `Chapter ${chapter}`,
        reference: bookmarkReference,
        content: contentPreview
      });
      
      toast({
        title: "Bookmark Added",
        description: `${book} ${chapter} has been saved to your bookmarks.`
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${book} ${chapter} | Faith Streamer`,
          text: `I'm reading ${book} ${chapter} on Faith Streamer`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support the Share API
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Verse link copied to clipboard"
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="relative bg-card rounded-lg px-4 py-6 border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-display">
            {book} <span className="font-normal">Chapter {chapter}</span>
          </h1>
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setFontSize(prev => Math.max(16, prev - 2))}
            className="text-sm">
            A-
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
            className="text-lg">
            A+
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBookmark}
            data-reference={bookmarkReference}
            title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? 
              <BookmarkCheck className="h-4 w-4 text-primary" /> : 
              <Bookmark className="h-4 w-4" />
            }
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Headphones className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading && (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading scripture...</p>
        </div>
      )}

      {error && (
        <div className="py-20 text-center">
          <p className="text-destructive">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && (
        <div className={cn("bible-text", "space-y-4")} style={{ fontSize: `${fontSize}px` }}>
          {chapter === 1 && (
            <div className="pb-4 border-b mb-4">
              <h2 className="font-display text-lg font-semibold mb-2">Introduction to {book}</h2>
              <p className="text-muted-foreground">
                {book === "Genesis" ? (
                  <span>
                    The Book of Genesis is the first book of the Bible and serves as an introduction to the entire Bible. It covers the creation of the world, the fall of humanity, God's covenant with Abraham, and the stories of Isaac, Jacob, and Joseph.
                  </span>
                ) : (
                  <span>This book is part of the Catholic Bible.</span>
                )}
              </p>
            </div>
          )}

          <div className="leading-relaxed">
            <span className="chapter-number">{chapter}</span>
            {verses.map((verse) => (
              <span key={verse.number}>
                <sup className="verse-number">{verse.number}</sup>
                {verse.text}{" "}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleReader;
