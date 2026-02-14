import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Sign, SignStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

export default function AdminSignEdit() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [status, setStatus] = useState<SignStatus>("fulfilled");
  const [category, setCategory] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>(0);

  const { data: existingSign } = useQuery({
    queryKey: ["signs", id],
    queryFn: () => api.get<Sign>(`/api/signs/${id}`),
    enabled: !isNew && !!id,
  });

  useEffect(() => {
    if (existingSign) {
      setTitle(existingSign.title);
      setSlug(existingSign.slug);
      setDescription(existingSign.description);
      setSource(existingSign.source);
      setStatus(existingSign.status);
      setCategory(existingSign.category || "");
      setPeriod(existingSign.period || "");
      setSortOrder(existingSign.sortOrder);
    }
  }, [existingSign]);

  const saveMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      if (isNew) {
        return api.post("/api/admin/signs", data);
      }
      return api.put(`/api/admin/signs/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signs"] });
      queryClient.invalidateQueries({ queryKey: ["homepage-content"] });
      toast({ title: isNew ? "Sign created" : "Sign updated" });
      navigate("/admin/signs");
    },
    onError: () => {
      toast({ title: "Failed to save sign", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug =
      slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    saveMutation.mutate({
      title,
      slug: generatedSlug,
      description,
      source,
      status,
      category: category || null,
      period: period || null,
      sortOrder,
    });
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/admin/signs")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Signs
      </Button>

      <Card className="max-w-2xl border-border/50">
        <CardHeader>
          <CardTitle className="font-heading">
            {isNew ? "Add New Sign" : "Edit Sign"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated-from-title"
              />
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
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={status}
                  onValueChange={(v) => setStatus(v as SignStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulfilled">Fulfilled</SelectItem>
                    <SelectItem value="unfolding">Unfolding</SelectItem>
                    <SelectItem value="approaching">Approaching</SelectItem>
                  </SelectContent>
                </Select>
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
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Input
                  id="period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="Optional"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : isNew ? "Create Sign" : "Update Sign"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/signs")}
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
