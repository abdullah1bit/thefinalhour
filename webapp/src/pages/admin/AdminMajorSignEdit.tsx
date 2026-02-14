import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { MajorSign } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Plus, X } from "lucide-react";

interface DetailItem {
  label: string;
  content: string;
}

export default function AdminMajorSignEdit() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [number, setNumber] = useState<number>(1);
  const [arabicTitle, setArabicTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sourcesText, setSourcesText] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [details, setDetails] = useState<DetailItem[]>([]);

  const { data: existingSign } = useQuery({
    queryKey: ["major-signs", id],
    queryFn: () => api.get<MajorSign>(`/api/major-signs/${id}`),
    enabled: !isNew && !!id,
  });

  useEffect(() => {
    if (existingSign) {
      setTitle(existingSign.title);
      setSlug(existingSign.slug);
      setNumber(existingSign.number);
      setArabicTitle(existingSign.arabicTitle);
      setSubtitle(existingSign.subtitle);
      setDescription(existingSign.description);
      setSourcesText(existingSign.sources.join(", "));
      setSortOrder(existingSign.sortOrder);
      setDetails(
        existingSign.details.map((d) => ({ label: d.label, content: d.content }))
      );
    }
  }, [existingSign]);

  const saveMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      if (isNew) {
        return api.post("/api/admin/major-signs", data);
      }
      return api.put(`/api/admin/major-signs/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["major-signs"] });
      queryClient.invalidateQueries({ queryKey: ["homepage-content"] });
      toast({ title: isNew ? "Major sign created" : "Major sign updated" });
      navigate("/admin/major-signs");
    },
    onError: () => {
      toast({ title: "Failed to save", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug =
      slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    saveMutation.mutate({
      title,
      slug: generatedSlug,
      number,
      arabicTitle,
      subtitle,
      description,
      sources: sourcesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      sortOrder,
      details: details.filter((d) => d.label && d.content),
    });
  };

  const addDetail = () => {
    setDetails([...details, { label: "", content: "" }]);
  };

  const removeDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const updateDetail = (index: number, field: "label" | "content", value: string) => {
    const updated = [...details];
    updated[index] = { ...updated[index], [field]: value };
    setDetails(updated);
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/admin/major-signs")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Major Signs
      </Button>

      <Card className="max-w-2xl border-border/50">
        <CardHeader>
          <CardTitle className="font-heading">
            {isNew ? "Add Major Sign" : "Edit Major Sign"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Number</Label>
                <Input
                  id="number"
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(Number(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated-from-title"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="arabicTitle">Arabic Title</Label>
                <Input
                  id="arabicTitle"
                  value={arabicTitle}
                  onChange={(e) => setArabicTitle(e.target.value)}
                  dir="rtl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sources">Sources (comma-separated)</Label>
              <Input
                id="sources"
                value={sourcesText}
                onChange={(e) => setSourcesText(e.target.value)}
                placeholder="Sahih Muslim, Sahih al-Bukhari"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
              />
            </div>

            {/* Details section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Details</Label>
                <Button type="button" variant="outline" size="sm" onClick={addDetail}>
                  <Plus className="mr-1 h-3 w-3" />
                  Add Detail
                </Button>
              </div>
              {details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex gap-2 rounded-md border border-border/50 p-3"
                >
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Label (e.g. Key Hadith)"
                      value={detail.label}
                      onChange={(e) => updateDetail(idx, "label", e.target.value)}
                    />
                    <Textarea
                      placeholder="Content..."
                      value={detail.content}
                      onChange={(e) => updateDetail(idx, "content", e.target.value)}
                      rows={2}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDetail(idx)}
                    className="self-start"
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending
                  ? "Saving..."
                  : isNew
                    ? "Create Major Sign"
                    : "Update Major Sign"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/major-signs")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
