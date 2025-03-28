
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookmarkPlus, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PrayerCardProps {
  title: string;
  description?: string;
  text: string;
  category?: string;
}

const PrayerCard = ({ title, description, text, category }: PrayerCardProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Prayer Saved",
      description: `${title} has been saved to your collection.`,
    });
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
        <Button size="sm" variant="outline" onClick={handleSave}>
          <BookmarkPlus className="mr-2 h-4 w-4" />
          Save
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
