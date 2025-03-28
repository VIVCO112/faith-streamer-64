
import { useEffect, useState } from "react";
import { getDailyDevotional } from "@/services/devotional-service";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Quote, BookOpen, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DailyDevotional = () => {
  const [devotional, setDevotional] = useState(getDailyDevotional());
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: devotional.title,
          text: `${devotional.verse.citation}: ${devotional.verse.text}\n\n${devotional.reflection}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          `${devotional.title}\n\n${devotional.verse.citation}: ${devotional.verse.text}\n\n${devotional.reflection}\n\n${devotional.prayer}`
        );
        toast({
          title: "Devotional Copied",
          description: "Today's devotional copied to clipboard.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Card className="devotional-card hover-lift overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-primary/90">
            <Calendar className="h-5 w-5 text-primary" />
            Daily Devotional
          </CardTitle>
          <span className="text-sm text-muted-foreground">{devotional.date}</span>
        </div>
        <CardDescription>{devotional.title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-md">
          <div className="flex items-start gap-2">
            <Quote className="h-5 w-5 text-primary shrink-0 mt-1" />
            <div>
              <p className="font-serif text-lg leading-relaxed italic">{devotional.verse.text}</p>
              <p className="text-right text-sm text-muted-foreground mt-2">— {devotional.verse.citation}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-secondary" />
            Reflection
          </h4>
          <p className="leading-relaxed">{devotional.reflection}</p>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Prayer</h4>
          <p className="italic font-serif">{devotional.prayer}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size="sm" variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyDevotional;
