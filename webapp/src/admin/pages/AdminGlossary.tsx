import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useGlossaryTerms } from "@/hooks/use-content";
import type { GlossaryTerm } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

export default function AdminGlossary() {
  const { data: terms, isLoading } = useGlossaryTerms();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [term, setTerm] = useState<string>("");
  const [arabic, setArabic] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [sourceLabel, setSourceLabel] = useState<string>("");
  const [sourceUrl, setSourceUrl] = useState<string>("");

  const resetForm = () => {
    setEditingId(null);
    setTerm("");
    setArabic("");
    setDefinition("");
    setSortOrder(0);
    setSourceLabel("");
    setSourceUrl("");
  };

  const openCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (item: GlossaryTerm) => {
    setEditingId(item.id);
    setTerm(item.term);
    setArabic(item.arabic || "");
    setDefinition(item.definition);
    setSortOrder(item.sortOrder);
    setSourceLabel(item.sourceLabel || "");
    setSourceUrl(item.sourceUrl || "");
    setDialogOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      if (editingId) {
        return api.put(`/api/admin/glossary/${editingId}`, data);
      }
      return api.post("/api/admin/glossary", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["glossary"] });
      toast({ title: editingId ? "Term updated" : "Term created" });
      setDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Failed to save", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/glossary/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["glossary"] });
      toast({ title: "Term deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      term,
      arabic: arabic || null,
      definition,
      sourceLabel: sourceLabel || null,
      sourceUrl: sourceUrl || null,
      sortOrder,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Glossary
        </h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Term
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Term" : "Add New Term"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="term">Term</Label>
                <Input
                  id="term"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arabic">Arabic (optional)</Label>
                <Input
                  id="arabic"
                  value={arabic}
                  onChange={(e) => setArabic(e.target.value)}
                  dir="rtl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="definition">Definition</Label>
                <Textarea
                  id="definition"
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  rows={3}
                  required
                />
              </div>
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
                <TableHead>Term</TableHead>
                <TableHead className="hidden md:table-cell">Arabic</TableHead>
                <TableHead className="hidden lg:table-cell">Definition</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(terms || []).map((item: GlossaryTerm) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.term}</TableCell>
                  <TableCell className="hidden md:table-cell font-arabic text-muted-foreground">
                    {item.arabic || "-"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground max-w-xs truncate">
                    {item.definition}
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
                            <AlertDialogTitle>Delete term?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{item.term}".
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
              ))}
              {(terms || []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No glossary terms found.
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
