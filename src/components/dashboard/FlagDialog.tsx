import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Send } from "lucide-react";
import { FlagAnnotation, FlagComment, FlagStatus } from "@/types/analytics";
import { format } from "date-fns";

interface FlagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string;
  keyword: string;
  annotation: FlagAnnotation | null;
  onSave: (annotation: FlagAnnotation) => void;
}

const statusOptions: { value: FlagStatus; label: string }[] = [
  { value: "to_fix", label: "To Fix" },
  { value: "fixed", label: "Fixed" },
  { value: "golden_set", label: "Golden Set" },
];

export function FlagDialog({ open, onOpenChange, sessionId, keyword, annotation, onSave }: FlagDialogProps) {
  const [status, setStatus] = React.useState<FlagStatus>(annotation?.status ?? "to_fix");
  const [expectedAnswer, setExpectedAnswer] = React.useState(annotation?.expectedAnswer ?? "");
  const [expectedSources, setExpectedSources] = React.useState<string[]>(
    annotation?.expectedSources?.length ? annotation.expectedSources : [""]
  );
  const [comments, setComments] = React.useState<FlagComment[]>(annotation?.comments ?? []);
  const [newComment, setNewComment] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setStatus(annotation?.status ?? "to_fix");
      setExpectedAnswer(annotation?.expectedAnswer ?? "");
      setExpectedSources(annotation?.expectedSources?.length ? annotation.expectedSources : [""]);
      setComments(annotation?.comments ?? []);
      setNewComment("");
    }
  }, [open, annotation]);

  const addSource = () => setExpectedSources((prev) => [...prev, ""]);
  const removeSource = (index: number) =>
    setExpectedSources((prev) => prev.filter((_, i) => i !== index));
  const updateSource = (index: number, value: string) =>
    setExpectedSources((prev) => prev.map((s, i) => (i === index ? value : s)));

  const addComment = () => {
    if (!newComment.trim()) return;
    const comment: FlagComment = {
      id: crypto.randomUUID(),
      author: "Current User",
      text: newComment.trim(),
      timestamp: new Date(),
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleSave = () => {
    onSave({
      status,
      expectedAnswer,
      expectedSources: expectedSources.filter((s) => s.trim() !== ""),
      comments,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base">
            Flag: <span className="font-mono text-muted-foreground">{keyword}</span>
          </DialogTitle>
          <p className="text-xs text-muted-foreground">Session {sessionId.slice(-6)}</p>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Status */}
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as FlagStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Expected Answer */}
          <div className="space-y-1.5">
            <Label>Expected Answer</Label>
            <Textarea
              placeholder="What should the correct answer be?"
              value={expectedAnswer}
              onChange={(e) => setExpectedAnswer(e.target.value)}
              rows={3}
            />
          </div>

          {/* Expected Sources */}
          <div className="space-y-1.5">
            <Label>Expected Source(s)</Label>
            {expectedSources.map((src, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  placeholder="https://example.com/page"
                  value={src}
                  onChange={(e) => updateSource(i, e.target.value)}
                />
                {expectedSources.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-8 w-8"
                    onClick={() => removeSource(i)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addSource} className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Add Source
            </Button>
          </div>

          <Separator />

          {/* Comments */}
          <div className="space-y-2">
            <Label>Comments</Label>
            {comments.length > 0 && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {comments.map((c) => (
                  <div key={c.id} className="rounded-md border p-2 text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-xs">{c.author}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {format(c.timestamp, "MMM d, HH:mm")}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs">{c.text}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-start gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={2}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addComment();
                  }
                }}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="shrink-0 mt-1"
                onClick={addComment}
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Flag</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
