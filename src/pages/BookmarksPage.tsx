
import { Bookmark } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BookmarksPage = () => {
  return (
    <div className="py-6 container space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
      </div>

      <div className="grid gap-4">
        {/* Empty state when no bookmarks are present */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Bookmark className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl mb-2">No bookmarks yet</CardTitle>
                <CardDescription className="max-w-md mx-auto">
                  Bookmarks allow you to save your favorite Bible verses, prayers, and readings for quick access later.
                </CardDescription>
                <div className="mt-6">
                  <Button variant="outline" className="mt-2" asChild>
                    <Link to="/bible">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Browse the Bible
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default BookmarksPage;
