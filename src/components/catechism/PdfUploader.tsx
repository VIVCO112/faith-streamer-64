
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { uploadAndParseCatechismPDF } from "@/services/pdf-parser-service";

export const PdfUploader: React.FC = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const success = await uploadAndParseCatechismPDF(file);
      if (success) {
        toast.success("Catechism PDF uploaded and processed successfully");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("Failed to process the Catechism PDF");
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg bg-background/50">
      <h3 className="text-lg font-medium">Upload Catechism PDF</h3>
      <p className="text-sm text-muted-foreground text-center">
        Upload a PDF of the Catechism of the Catholic Church to enable search and navigation features.
      </p>
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf"
        onChange={handleUpload}
        className="hidden"
      />
      <Button 
        onClick={triggerFileSelect} 
        disabled={isUploading}
        variant="outline"
      >
        {isUploading ? "Uploading..." : "Select PDF File"}
      </Button>
    </div>
  );
};
