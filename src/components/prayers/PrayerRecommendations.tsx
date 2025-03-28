
import { useState } from "react";
import { getPrayerRecommendations, recommendedPrayers } from "@/services/devotional-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PrayerCard from "./PrayerCard";

const PrayerRecommendations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState<typeof recommendedPrayers>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const results = getPrayerRecommendations(searchQuery);
    setRecommendations(results);
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-primary/90">Find Prayers for Your Needs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Describe your situation or need..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9"
          />
        </div>

        {hasSearched && (
          <div className="space-y-4 mt-4">
            {recommendations.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {recommendations.length} {recommendations.length === 1 ? 'prayer' : 'prayers'} found for "{searchQuery}"
                </p>
                {recommendations.map((prayer, index) => (
                  <PrayerCard
                    key={index}
                    title={prayer.title}
                    category={prayer.category}
                    text={prayer.text}
                  />
                ))}
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No specific prayers found for "{searchQuery}"</p>
                <p className="text-sm mt-2">Try different keywords like "strength", "healing", "peace", or "guidance"</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrayerRecommendations;
