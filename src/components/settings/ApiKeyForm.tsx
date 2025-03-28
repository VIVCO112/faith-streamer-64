
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { setBibleApiKey, getBibleApiKey, clearBibleApiKey } from '@/services/bible-api-service';

export const ApiKeyForm: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);

  useEffect(() => {
    const savedKey = getBibleApiKey();
    setIsKeySet(!!savedKey && savedKey !== "YOUR_ACTUAL_API_KEY");
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      setBibleApiKey(apiKey.trim());
      setApiKey('');
      setIsKeySet(true);
    }
  };

  const handleClearKey = () => {
    clearBibleApiKey();
    setIsKeySet(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bible API Key</CardTitle>
        <CardDescription>
          Enter your API key for the Scripture API Bible service
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isKeySet ? (
          <div className="space-y-4">
            <p className="text-sm text-green-600 dark:text-green-400">
              API key is set and ready to use.
            </p>
            <Button variant="destructive" onClick={handleClearKey}>
              Remove API Key
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input 
              type="password"
              placeholder="Enter your API key" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button onClick={handleSaveKey}>Save API Key</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
