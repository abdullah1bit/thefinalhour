import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, AlertTriangle } from "lucide-react";

export default function AdminBackup() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState<boolean>(false);

  const handleExport = async () => {
    try {
      const data = await api.get<Record<string, unknown>>("/api/admin/export");
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `thefinalhour-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({ title: "Export downloaded successfully" });
    } catch (error) {
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  const handleImport = async (file: File) => {
    setImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const result = await api.post<{ imported: Record<string, number> }>(
        "/api/admin/import",
        data
      );
      const counts = Object.entries(result.imported)
        .map(([key, count]) => `${key}: ${count}`)
        .join(", ");
      toast({ title: "Import completed", description: counts });
      queryClient.invalidateQueries();
    } catch (error) {
      toast({
        title: "Import failed",
        description:
          error instanceof Error ? error.message : "Invalid file",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
        Backup & Restore
      </h2>
      <div className="grid gap-6 max-w-2xl">
        <Card className="border-border/50 bg-card/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Download className="h-5 w-5" />
              Export Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Download all site content as a JSON file. This includes signs,
              major signs, glossary, verses, scholarly works, timeline,
              interpretations, banners, and settings.
            </p>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Download Backup
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="h-5 w-5" />
              Import Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                Importing will replace existing content for each included
                section. This cannot be undone.
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImport(file);
              }}
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
            >
              <Upload className="mr-2 h-4 w-4" />
              {importing ? "Importing..." : "Upload Backup File"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
