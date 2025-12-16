import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, X, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CSVData {
  headers: string[];
  rows: Record<string, string | number>[];
}

interface CSVUploadProps {
  onDataLoaded?: (data: CSVData) => void;
}

export function CSVUpload({ onDataLoaded }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState<CSVData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): CSVData => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      const row: Record<string, string | number> = {};
      headers.forEach((header, index) => {
        const value = values[index];
        const numValue = parseFloat(value);
        row[header] = isNaN(numValue) ? value : numValue;
      });
      return row;
    });

    return { headers, rows };
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      toast.error("Please select a CSV file");
      return;
    }

    setFile(selectedFile);
    setIsLoading(true);

    try {
      const text = await selectedFile.text();
      const data = parseCSV(text);
      setParsedData(data);
      onDataLoaded?.(data);
      toast.success(`Loaded ${data.rows.length} rows from ${selectedFile.name}`);
    } catch (error) {
      toast.error("Failed to parse CSV file");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    
    if (!droppedFile?.name.endsWith('.csv')) {
      toast.error("Please drop a CSV file");
      return;
    }

    setFile(droppedFile);
    setIsLoading(true);

    try {
      const text = await droppedFile.text();
      const data = parseCSV(text);
      setParsedData(data);
      onDataLoaded?.(data);
      toast.success(`Loaded ${data.rows.length} rows from ${droppedFile.name}`);
    } catch (error) {
      toast.error("Failed to parse CSV file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const clearFile = () => {
    setFile(null);
    setParsedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-primary" />
          Upload SKU Data
        </CardTitle>
        <CardDescription>
          Upload a CSV file with historical demand data for AI-powered forecasting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          ref={fileInputRef}
          className="hidden"
        />

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300"
          >
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your CSV file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supported columns: sku_id, date, demand, promotional_flag, etc.
            </p>
            <Button variant="outline" className="mt-4">
              Select CSV File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50">
              <div className="flex items-center gap-3">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {isLoading ? "Parsing..." : `${parsedData?.rows.length || 0} rows loaded`}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={clearFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {parsedData && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Detected columns: <span className="text-foreground">{parsedData.headers.join(', ')}</span>
                </p>
                
                <div className="max-h-48 overflow-auto rounded-lg border border-border/50">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/50 sticky top-0">
                      <tr>
                        {parsedData.headers.slice(0, 5).map((header) => (
                          <th key={header} className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                            {header}
                          </th>
                        ))}
                        {parsedData.headers.length > 5 && (
                          <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">...</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {parsedData.rows.slice(0, 5).map((row, i) => (
                        <tr key={i} className="border-t border-border/30">
                          {parsedData.headers.slice(0, 5).map((header) => (
                            <td key={header} className="px-3 py-2 text-foreground">
                              {String(row[header])}
                            </td>
                          ))}
                          {parsedData.headers.length > 5 && (
                            <td className="px-3 py-2 text-muted-foreground">...</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {parsedData.rows.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center">
                    Showing first 5 of {parsedData.rows.length} rows
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
