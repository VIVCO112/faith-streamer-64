
import { useState, useEffect } from "react";
import { getScriptureContext } from "@/services/devotional-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { InfoIcon, BookOpenText } from "lucide-react";

interface ScriptureContextProps {
  citation: string;
}

const ScriptureContext = ({ citation }: ScriptureContextProps) => {
  const [context, setContext] = useState<{
    context: string;
    historical: string;
  } | null>(null);

  useEffect(() => {
    if (citation) {
      const contextInfo = getScriptureContext(citation);
      setContext(contextInfo);
    }
  }, [citation]);

  if (!context) {
    return null;
  }

  return (
    <Card className="mt-4 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-primary/80">
          <InfoIcon className="h-4 w-4" />
          Scripture Context: {citation}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[160px] pr-4">
          <div className="space-y-3">
            <div>
              <h4 className="text-xs uppercase font-semibold text-muted-foreground">Context</h4>
              <p className="text-sm">{context.context}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-xs uppercase font-semibold text-muted-foreground">Historical Background</h4>
              <p className="text-sm">{context.historical}</p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ScriptureContext;
