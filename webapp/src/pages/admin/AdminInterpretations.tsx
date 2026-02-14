import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useInterpretations } from "@/hooks/use-content";
import type { Interpretation } from "@/lib/types";
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

export default function AdminInterpretations() {
  const { data: interpretations, isLoading } = useInterpretations();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [prophecy, setProphecy] = useState<string>("");
  const [modernInterpretation, setModernInterpretation] = useState<string>("");
  const [scholarlyCaution, setScholarlyCaution] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [sourceLabel, setSourceLabel] = useState<string>("");
  const [sourceUrl, setSourceUrl] = useState<string>("");

  const resetForm = () => {
    setEditingId(null);
    setProphecy("");
    setModernInterpretation("");
    setScholarlyCaution("");
    setSortOrder(0);
    setSourceLabel("");
    setSourceUrl("");
  };

  const openCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (item: Interpretation) => {
    setEditingId(item.id);
    setProphecy(item.prophecy);
    setModernInterpretation(item.modernInterpretation);
    setScholarlyCaution(item.scholarlyCaution);
    setSortOrder(item.sortOrder);
    setSourceLabel(item.sourceLabel || "");
    setSourceUrl(item.sourceUrl || "");
    setDialogOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      if (editingId) {
        return api.put(`/api/admin/interpretations/${editingId}`, data);
      }
      return api.post("/api/admin/interpretations", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interpretations"] });
      queryClient.invalidateQueries({ queryKey: ["homepage-content"] });
      toast({
        title: editingId ? "Interpretation updated" : "Interpretation created",
      });
      setDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Failed to save", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      api.delete(`/api/admin/interpretations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interpretations"] });
      queryClient.invalidateQueries({ queryKey: ["homepage-content"] });
      toast({ title: "Interpretation deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      prophecy,
      modernInterpretation,
      scholarlyCaution,
      sourceLabel: sourceLabel || null,
      sourceUrl: sourceUrl || null,
      sortOrder,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Interpretations
        </h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Interpretation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Interpretation" : "Add New Interpretation"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prophecy">Prophecy</Label>
                <Input
                  id="prophecy"
                  value={prophecy}
                  onChange={(e) => setProphecy(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modernInterpretation">
                  Modern Interpretation
                </Label>
                <Textarea
                  id="modernInterpretation"
                  value={modernInterpretation}
                  onChange={(e) => setModernInterpretation(e.target.value)}
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scholarlyCaution">Scholarly Caution</Label>
                <Input
                  id="scholarlyCaution"
                  value={scholarlyCaution}
                  onChange={(e) => setScholarlyCaution(e.target.value)}
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
                <TableHead>Prophecy</TableHead>
                <TableHead className="hidden md:table-cell">
                  Interpretation
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(interpretations || []).map((item: Interpretation) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {item.prophecy}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-md truncate">
                    {item.modernInterpretation}
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
                            <AlertDialogTitle>
                              Delete interpretation?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this interpretation.
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
              {(interpretations || []).length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No interpretations found.
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
