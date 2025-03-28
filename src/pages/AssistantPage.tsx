
import BibleAssistant from "@/components/assistant/BibleAssistant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Bot, HelpCircle, Info, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const AssistantPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="py-6 container space-y-6 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bible Assistant</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
              <HelpCircle className="h-5 w-5 text-primary" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>About the Bible Assistant</DialogTitle>
              <DialogDescription>
                Learn how the Bible Assistant can help you explore scripture and Catholic teachings.
              </DialogDescription>
            </DialogHeader>
            
            <DialogClose asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-4 rounded-full hover:bg-accent" 
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
            
            <div className="space-y-6 py-4">
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  About the Assistant
                </h3>
                <p className="text-sm text-muted-foreground">
                  The Bible Assistant uses a lightweight, privacy-focused approach to help you
                  explore Catholic teachings and scripture. All processing happens in your
                  browser without sending data to external services.
                </p>
                <div className="mt-4 text-sm space-y-2">
                  <h4 className="font-medium">Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Ask questions about scripture and teachings</li>
                    <li>Voice input and text-to-speech output</li>
                    <li>Save and manage conversation history</li>
                    <li>Share verses and insights</li>
                    <li>Categorize your questions for better responses</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary" />
                  Sample Questions
                </h3>
                <div className="text-sm space-y-3">
                  <div className="p-2 bg-muted rounded-md">
                    What does the Catholic Church teach about the Eucharist?
                  </div>
                  <div className="p-2 bg-muted rounded-md">
                    Can you explain the Rosary and how to pray it?
                  </div>
                  <div className="p-2 bg-muted rounded-md">
                    What is the meaning of John 3:16?
                  </div>
                  <div className="p-2 bg-muted rounded-md">
                    How does confession work in Catholicism?
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="w-full">
        <BibleAssistant />
      </div>
    </div>
  );
};

export default AssistantPage;
