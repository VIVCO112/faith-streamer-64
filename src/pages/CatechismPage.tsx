
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCatechismSections, searchCatechism, CatechismParagraph, CatechismSection } from "@/services/catechism-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Search, Share2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { uploadAndParseCatechismPDF } from "@/services/pdf-parser-service";

const CatechismPage = () => {
  const [sections, setSections] = useState<CatechismSection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CatechismParagraph[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");
  const { addBookmark, hasBookmark } = useBookmarks();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadCatechism = async () => {
      setIsLoading(true);
      try {
        const data = await getCatechismSections();
        setSections(data);
      } catch (error) {
        console.error("Failed to load catechism:", error);
        toast.error("Failed to load the Catechism");
      } finally {
        setIsLoading(false);
      }
    };

    loadCatechism();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await searchCatechism(searchQuery);
      setSearchResults(results);
      setActiveTab("search");
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Failed to search the Catechism");
    } finally {
      setIsSearching(false);
    }
  };

  const handleBookmark = (paragraph: CatechismParagraph) => {
    addBookmark({
      type: "catechism",
      title: `Catechism ¶${paragraph.number}`,
      content: paragraph.text,
      reference: `CCC ¶${paragraph.number}`,
    });
    
    toast.success("Catechism paragraph added to bookmarks");
  };
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const success = await uploadAndParseCatechismPDF(file);
    
    if (success) {
      // In a real implementation, we would refresh the catechism data here
      // For now, we'll just show a message
      toast.success("PDF processed successfully");
    }
    
    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const shareContent = (content: string, reference: string) => {
    if (navigator.share) {
      navigator.share({
        title: reference,
        text: `${reference}: ${content}`,
      })
      .catch(err => {
        console.error("Sharing failed:", err);
        copyToClipboard(`${reference}: ${content}`);
      });
    } else {
      copyToClipboard(`${reference}: ${content}`);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Catechism of the Catholic Church</h1>
        <Button onClick={handleUploadClick} className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Catechism PDF
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".pdf" 
          className="hidden" 
        />
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-4">
          <Card className="h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Catechism
                </CardTitle>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="browse">Browse</TabsTrigger>
                    <TabsTrigger value="search">Search</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>
                The Catechism of the Catholic Church
              </CardDescription>
            </CardHeader>

            <div className="px-4 mb-4">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex w-full gap-2"
              >
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search the Catechism..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isSearching || !searchQuery.trim()}>
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full pr-4">
                <Tabs value={activeTab} className="w-full">
                  <TabsContent value="browse" className="mt-0 space-y-6">
                    {isLoading ? (
                      <div className="space-y-4 p-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="space-y-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6 p-4">
                        {sections.map((section) => (
                          <div key={section.id} className="space-y-4">
                            <h3 className="font-semibold text-lg">{section.title}</h3>
                            <div className="space-y-4">
                              {section.paragraphs.map((paragraph) => (
                                <div key={paragraph.number} className="space-y-2 pb-4 border-b">
                                  <div className="flex justify-between items-start">
                                    <h4 className="font-medium flex items-center gap-1">
                                      <span className="text-primary">¶{paragraph.number}</span>
                                      {paragraph.title && <span className="font-normal text-sm text-muted-foreground ml-2">{paragraph.title}</span>}
                                    </h4>
                                    <div className="flex gap-1">
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7"
                                        onClick={() => handleBookmark(paragraph)}
                                      >
                                        <BookOpen className="h-3.5 w-3.5" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7"
                                        onClick={() => shareContent(paragraph.text, `CCC ¶${paragraph.number}`)}
                                      >
                                        <Share2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </div>
                                  <p className="text-sm">{paragraph.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="search" className="mt-0">
                    <div className="p-4 space-y-4">
                      {isSearching ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                              <Skeleton className="h-5 w-40" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                          ))}
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="space-y-6">
                          <p className="text-sm text-muted-foreground">Found {searchResults.length} results for "{searchQuery}"</p>
                          {searchResults.map((paragraph) => (
                            <div key={paragraph.number} className="space-y-2 pb-4 border-b">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium text-primary">¶{paragraph.number}</h4>
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7"
                                    onClick={() => handleBookmark(paragraph)}
                                  >
                                    <BookOpen className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7"
                                    onClick={() => shareContent(paragraph.text, `CCC ¶${paragraph.number}`)}
                                  >
                                    <Share2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm">{paragraph.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        searchQuery && <p className="text-center py-8 text-muted-foreground">No results found for "{searchQuery}"</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CatechismPage;
