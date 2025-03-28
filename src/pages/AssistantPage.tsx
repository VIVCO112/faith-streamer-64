
import BibleAssistant from "@/components/assistant/BibleAssistant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Bot, Info } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const AssistantPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="py-6 container space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bible Assistant</h1>
      </div>
      
      {!isMobile ? (
        // Desktop layout - side by side
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <BibleAssistant />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  About the Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Sample Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Mobile layout - stacked with accordions
        <div className="flex flex-col gap-6">
          <div className="w-full">
            <BibleAssistant />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="about">
              <AccordionTrigger className="flex gap-2 py-3">
                <Info className="h-4 w-4 text-primary" />
                <span>About the Assistant</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm text-muted-foreground space-y-4 pt-2">
                  <p>
                    The Bible Assistant uses a lightweight, privacy-focused approach to help you
                    explore Catholic teachings and scripture. All processing happens in your
                    browser without sending data to external services.
                  </p>
                  <div className="space-y-2">
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
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="sample-questions">
              <AccordionTrigger className="flex gap-2 py-3">
                <Bot className="h-4 w-4 text-primary" />
                <span>Sample Questions</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm space-y-3 pt-2">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default AssistantPage;
