import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useTimelineEvents } from "@/hooks/use-content";
import type { TimelineEvent, SignStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SourceLinkFields from "@/components/admin/SourceLinkFields";
import ImageUpload from "@/components/admin/ImageUpload";
import type { ImageSettings } from "@/lib/types";

const statusBadge: Record<string, { bg: string; text: string }> = {
  fulfilled: { bg: "bg-fulfilled/10 border-fulfilled/30", text: "text-fulfilled" },
  unfolding: { bg: "bg-unfolding/10 border-unfolding/30", text: "text-unfolding" },
  approaching: { bg: "bg-approaching/10 border-approaching/30", text: "text-approaching" },
};

export default function AdminTimeline() {
  const { data: events, isLoading } = useTimelineEvents();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [status, setStatus] = useState<SignStatus>("approaching");
  const [description, setDescription] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [sourceLabel, setSourceLabel] = useState<string>("");
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageSettings, setImageSettings] = useState<ImageSettings | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setStatus("approaching");
    setDescription("");
    setSortOrder(0);
    setSourceLabel("");
    setSourceUrl("");
    setImageUrl(null);
    setImageSettings(null);
  };

  const openCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (item: TimelineEvent) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setStatus(item.status);
    setDescription(item.description);
    setSortOrder(item.sortOrder);
    setSourceLabel(item.sourceLabel || "");
    setSourceUrl(item.sourceUrl || "");
    setImageUrl(item.imageUrl || null);
    setImageSettings(item.imageSettings ? JSON.parse(item.imageSettings) : null);
    setDialogOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      if (editingId) {
        return api.put(`/api/admin/timeline/${editingId}`, data);
      }
      return api.post("/api/admin/timeline", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      toast({ title: editingId ? "Event updated" : "Event created" });
      setDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Failed to save", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/timeline/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      toast({ title: "Event deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug =
      slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    saveMutation.mutate({
      title,
      slug: generatedSlug,
      status,
      description,
      sourceLabel: sourceLabel || null,
      sourceUrl: sourceUrl || null,
      imageUrl,
      imageSettings: imageSettings ? JSON.stringify(imageSettings) : null,
      sortOrder,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Timeline
        </h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Event" : "Add New Event"}
              </DialogTitle>
            </DialogHeader>
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <ImageUpload
                imageUrl={imageUrl}
                imageSettings={imageSettings}
                onImageUrlChange={setImageUrl}
                onImageSettingsChange={setImageSettings}
              />
              <SourceLinkFields
                sourceLabel={sourceLabel}
                sourceUrl={sourceUrl}
                onSourceLabelChange={setSourceLabel}
                onSourceUrlChange={setSourceUrl}
              />
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Starts from 0 (0 = first)</p>
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(events || []).map((item: TimelineEvent) => {
                const badge = statusBadge[item.status] || statusBadge.approaching;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          badge.bg,
                          badge.text
                        )}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">
                      {item.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete event?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete "{item.title}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(item.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {(events || []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No timeline events found.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
