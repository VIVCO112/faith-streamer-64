
import { Bookmark, BookmarkCheck, ExternalLink, Clock, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const BookmarksPage = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<string | null>(null);

  const confirmRemoveBookmark = (id: string) => {
    setSelectedBookmark(id);
    setDialogOpen(true);
  };

  const handleRemoveBookmark = () => {
    if (selectedBookmark) {
      removeBookmark(selectedBookmark);
      setDialogOpen(false);
    }
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Group bookmarks by type for display
  const bibleBookmarks = bookmarks.filter(b => b.type === "bible");
  const prayerBookmarks = bookmarks.filter(b => b.type === "prayer");
  const readingBookmarks = bookmarks.filter(b => b.type === "reading");

  return (
    <div className="py-6 container space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
        {bookmarks.length > 0 && (
          <div className="text-sm text-muted-foreground">
            {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {bookmarks.length === 0 ? (
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
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" className="mt-2" asChild>
                    <Link to="/bible">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Browse the Bible
                    </Link>
                  </Button>
                  <Button variant="outline" className="mt-2" asChild>
                    <Link to="/prayers">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Browse Prayers
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-8">
          {bibleBookmarks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Bible Chapters</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {bibleBookmarks.map((bookmark) => (
                  <Card key={bookmark.id} data-id={bookmark.id} data-reference={bookmark.reference}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>{bookmark.title}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => confirmRemoveBookmark(bookmark.id)} 
                          className="h-8 w-8 -mr-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                      <CardDescription>{bookmark.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {bookmark.content}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(bookmark.timestamp)}
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/bible/${bookmark.title.split(' ')[0]}/${bookmark.title.split(' ')[1]}`}>
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Open
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {prayerBookmarks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Prayers</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {prayerBookmarks.map((bookmark) => (
                  <Card key={bookmark.id} data-id={bookmark.id} data-reference={bookmark.reference}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>{bookmark.title}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => confirmRemoveBookmark(bookmark.id)} 
                          className="h-8 w-8 -mr-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                      {bookmark.subtitle && (
                        <CardDescription>
                          <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                            {bookmark.subtitle}
                          </span>
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {bookmark.content}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(bookmark.timestamp)}
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/prayers">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          View
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {readingBookmarks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Readings</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {readingBookmarks.map((bookmark) => (
                  <Card key={bookmark.id} data-id={bookmark.id} data-reference={bookmark.reference}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>{bookmark.title}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => confirmRemoveBookmark(bookmark.id)} 
                          className="h-8 w-8 -mr-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                      <CardDescription>{bookmark.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {bookmark.content}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(bookmark.timestamp)}
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/readings">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          View
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Bookmark</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this bookmark? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveBookmark}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookmarksPage;
