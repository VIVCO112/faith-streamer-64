
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrayerCard from "@/components/prayers/PrayerCard";
import PrayerRecommendations from "@/components/prayers/PrayerRecommendations";
import { catholicPrayers } from "@/data/bible-data";
import { Search } from "lucide-react";

const categories = ["All", "Essential"];

const PrayersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrayers = catholicPrayers.filter(prayer => {
    const matchesCategory = selectedCategory === "All" || prayer.category === selectedCategory;
    const matchesSearch = prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prayer.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-6 space-y-6">
      <PrayerRecommendations />
      
      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-accent/60 to-accent/20"></div>
        <CardHeader>
          <CardTitle>Prayers</CardTitle>
          <CardDescription>
            Traditional and devotional prayers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search prayers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full justify-start bg-muted/50">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-4 py-4">
            {filteredPrayers.map((prayer, index) => (
              <PrayerCard key={index} {...prayer} />
            ))}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default PrayersPage;
