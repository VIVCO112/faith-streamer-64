
import BibleAssistant from "@/components/assistant/BibleAssistant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Info } from "lucide-react";

const AssistantPage = () => {
  return (
    <div className="py-6 container space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bible Assistant</h1>
      </div>
      
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
    </div>
  );
};

export default AssistantPage;
