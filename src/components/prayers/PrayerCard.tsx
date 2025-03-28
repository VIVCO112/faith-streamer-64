
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBookmarks } from "@/contexts/BookmarksContext";

interface PrayerCardProps {
  title: string;
  description?: string;
  text: string;
  category?: string;
}

const PrayerCard = ({ title, description, text, category }: PrayerCardProps) => {
  const { toast } = useToast();
  const { addBookmark, hasBookmark, removeBookmark } = useBookmarks();
  
  const prayerReference = `prayer-${title.replace(/\s+/g, '-').toLowerCase()}`;
  const isBookmarked = hasBookmark(prayerReference);

  const handleSave = () => {
    if (isBookmarked) {
      // Find the bookmark to remove
      const bookmarkIds = document.querySelectorAll(`[data-reference="${prayerReference}"]`);
      if (bookmarkIds.length > 0) {
        const id = bookmarkIds[0].getAttribute('data-id');
        if (id) removeBookmark(id);
      }
      
      toast({
        title: "Prayer Removed",
        description: `${title} has been removed from your bookmarks.`,
      });
    } else {
      // Create content preview (limited to ~100 chars)
      let contentPreview = text;
      if (contentPreview.length > 100) {
        contentPreview = contentPreview.substring(0, 97) + "...";
      }
      
      addBookmark({
        type: "prayer",
        title: title,
        subtitle: category,
        reference: prayerReference,
        content: contentPreview
      });
      
      toast({
        title: "Prayer Saved",
        description: `${title} has been saved to your collection.`,
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${title}\n\n${text}`);
        toast({
          title: "Prayer Copied",
          description: "Prayer text copied to clipboard.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Card className="prayer-card">
      {category && (
        <div className="px-4 pt-4">
          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs">
            {category}
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-line font-serif text-lg leading-relaxed">
          {text}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleSave}
          data-reference={prayerReference}
          title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarked ? 
            <BookmarkCheck className="mr-2 h-4 w-4 text-primary" /> : 
            <Bookmark className="mr-2 h-4 w-4" />
          }
          {isBookmarked ? "Saved" : "Save"}
        </Button>
        <Button size="sm" variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PrayerCard;
