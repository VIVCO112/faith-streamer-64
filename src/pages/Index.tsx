
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { popularVerses } from "@/data/bible-data";
import { Quote } from "lucide-react";
import DailyDevotional from "@/components/devotional/DailyDevotional";

const Index = () => {
  const getRandomVerse = () => {
    return popularVerses[Math.floor(Math.random() * popularVerses.length)];
  };

  const dailyVerse = getRandomVerse();

  return (
    <div className="min-h-[calc(100vh-6rem)] py-6 space-y-8 animate-fade-in">
      <header className="text-center mb-8">
        <h1 className="font-display text-4xl md:text-5xl mb-3 text-primary">Faith Streamer</h1>
        <p className="text-lg text-muted-foreground">
          Your companion for scripture, prayer, and spiritual growth
        </p>
      </header>

      {/* Show Daily Devotional on larger screens or as first item on mobile */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="reading-card hover-lift overflow-hidden order-2 sm:order-1">
          <div className="h-1 bg-gradient-to-r from-primary to-accent"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Quote className="h-5 w-5 text-primary" />
              Verse of the Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="bible-text">
              {dailyVerse.text}
              <footer className="mt-2 text-right text-muted-foreground">
                — {dailyVerse.citation}
              </footer>
            </blockquote>
          </CardContent>
        </Card>
        
        <div className="order-1 sm:order-2">
          <DailyDevotional />
        </div>
      </div>
    </div>
  );
};

export default Index;
