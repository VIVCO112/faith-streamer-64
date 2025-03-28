
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { popularVerses } from "@/data/bible-data";
import { BookOpen, Bot, Calendar, HandHeart, Quote } from "lucide-react";

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
          Your companion for Catholic scripture, prayer, and spiritual growth
        </p>
      </header>

      <Card className="reading-card hover-lift overflow-hidden">
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

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="staggered-item hover-lift overflow-hidden border-primary/10">
          <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/20"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Read the Bible
            </CardTitle>
            <CardDescription>
              Access the complete Catholic Bible with commentary and study tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/bible">
              <Button className="w-full">Open Bible</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="staggered-item hover-lift overflow-hidden border-accent/10">
          <div className="h-1 bg-gradient-to-r from-accent/60 to-accent/20"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Daily Readings
            </CardTitle>
            <CardDescription>
              View today's Mass readings and reflections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/readings">
              <Button className="w-full">View Readings</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="staggered-item hover-lift overflow-hidden border-secondary/10">
          <div className="h-1 bg-gradient-to-r from-secondary/60 to-secondary/20"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HandHeart className="h-5 w-5 text-secondary" />
              Catholic Prayers
            </CardTitle>
            <CardDescription>
              Traditional prayers, devotions, and spiritual resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/prayers">
              <Button className="w-full">Browse Prayers</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="staggered-item hover-lift overflow-hidden border-primary/10">
          <div className="h-1 bg-gradient-to-r from-primary/80 to-accent/40"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Bible Assistant
            </CardTitle>
            <CardDescription>
              Get help understanding scripture and Catholic teachings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/assistant">
              <Button className="w-full">Ask Assistant</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
