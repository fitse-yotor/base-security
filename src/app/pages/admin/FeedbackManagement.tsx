import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Star, Plus, MessageSquare, TrendingUp, ThumbsUp } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner';

function StarRating({ rating, onRate }: { rating: number; onRate?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate?.(star)}
          onMouseEnter={() => onRate && setHovered(star)}
          onMouseLeave={() => onRate && setHovered(0)}
          className={onRate ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className={`w-5 h-5 ${
              star <= (hovered || rating)
                ? 'fill-primary text-primary'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function FeedbackManagement() {
  const { clients, addClientFeedback, addClientNote } = useAppStore();
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [feedbackForm, setFeedbackForm] = useState({ clientId: '', rating: 0, comment: '' });
  const [noteForm, setNoteForm] = useState({ clientId: '', text: '' });

  const allFeedback = clients.flatMap((c) =>
    c.feedback.map((f) => ({ ...f, clientName: c.name, company: c.company }))
  );

  const avgRating =
    allFeedback.length > 0
      ? allFeedback.reduce((sum, f) => sum + f.rating, 0) / allFeedback.length
      : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((r) => ({
    rating: r,
    count: allFeedback.filter((f) => f.rating === r).length,
  }));

  const handleAddFeedback = () => {
    if (!feedbackForm.clientId || feedbackForm.rating === 0 || !feedbackForm.comment) {
      toast.error('Please fill all required fields and select a rating');
      return;
    }
    addClientFeedback(feedbackForm.clientId, {
      rating: feedbackForm.rating as 1 | 2 | 3 | 4 | 5,
      comment: feedbackForm.comment,
    });
    toast.success('Feedback recorded successfully');
    setShowFeedbackDialog(false);
    setFeedbackForm({ clientId: '', rating: 0, comment: '' });
  };

  const handleAddNote = () => {
    if (!noteForm.clientId || !noteForm.text) {
      toast.error('Please select a client and enter a note');
      return;
    }
    addClientNote(noteForm.clientId, noteForm.text);
    toast.success('Note added successfully');
    setShowNoteDialog(false);
    setNoteForm({ clientId: '', text: '' });
  };

  const selectedClient = clients.find((c) => c.id === selectedClientId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-3xl mb-2">Client Feedback & Notes</h1>
          <p className="text-muted-foreground">Track client satisfaction and maintain relationship notes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowNoteDialog(true)}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Add Note
          </Button>
          <Button onClick={() => setShowFeedbackDialog(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Record Feedback
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
                <div className="text-2xl font-semibold text-primary">{avgRating.toFixed(1)} / 5</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ThumbsUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Reviews</div>
                <div className="text-2xl font-semibold text-blue-600">{allFeedback.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Satisfied Clients (4+)</div>
                <div className="text-2xl font-semibold text-green-600">
                  {allFeedback.filter((f) => f.rating >= 4).length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ratingCounts.map(({ rating, count }) => (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-20">
                  <span className="text-sm">{rating}</span>
                  <Star className="w-4 h-4 fill-primary text-primary" />
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ width: allFeedback.length > 0 ? `${(count / allFeedback.length) * 100}%` : '0%' }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Client Selector for detailed view */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle>Client Details</CardTitle>
            <Select value={selectedClientId} onValueChange={setSelectedClientId}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a client to view" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.company} — {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        {selectedClient && (
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Feedback */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" /> Feedback History
                </h3>
                {selectedClient.feedback.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No feedback yet</p>
                ) : (
                  <div className="space-y-3">
                    {selectedClient.feedback.map((fb) => (
                      <div key={fb.id} className="p-3 bg-gray-50 rounded-lg">
                        <StarRating rating={fb.rating} />
                        <p className="text-sm mt-2 italic">"{fb.comment}"</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(fb.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Relationship Notes
                </h3>
                <div className="space-y-2 mb-3">
                  {selectedClient.lastContactDate && (
                    <div className="flex justify-between text-sm p-2 bg-blue-50 rounded">
                      <span className="text-muted-foreground">Last Contact</span>
                      <span>{new Date(selectedClient.lastContactDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {selectedClient.nextFollowUp && (
                    <div className="flex justify-between text-sm p-2 bg-yellow-50 rounded">
                      <span className="text-muted-foreground">Next Follow-up</span>
                      <span className="font-semibold">{new Date(selectedClient.nextFollowUp).toLocaleDateString()}</span>
                    </div>
                  )}
                  {selectedClient.contractEnd && (
                    <div className="flex justify-between text-sm p-2 bg-orange-50 rounded">
                      <span className="text-muted-foreground">Contract Ends</span>
                      <span className="font-semibold">{new Date(selectedClient.contractEnd).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                {selectedClient.notes.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No notes yet</p>
                ) : (
                  <div className="space-y-2">
                    {selectedClient.notes.map((note) => (
                      <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm">{note.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* All Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>All Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {allFeedback.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No feedback recorded yet</p>
          ) : (
            <div className="space-y-4">
              {allFeedback
                .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                .map((fb) => (
                  <div key={fb.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="font-semibold">{fb.company}</span>
                          <span className="text-sm text-muted-foreground ml-2">— {fb.clientName}</span>
                        </div>
                        <StarRating rating={fb.rating} />
                      </div>
                      <p className="text-sm italic text-muted-foreground">"{fb.comment}"</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(fb.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Record Client Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Client *</Label>
              <Select value={feedbackForm.clientId} onValueChange={(v) => setFeedbackForm({ ...feedbackForm, clientId: v })}>
                <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.company} — {c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Rating *</Label>
              <StarRating
                rating={feedbackForm.rating}
                onRate={(r) => setFeedbackForm({ ...feedbackForm, rating: r })}
              />
            </div>
            <div className="space-y-2">
              <Label>Comment *</Label>
              <Textarea
                value={feedbackForm.comment}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                placeholder="Client's feedback..."
                rows={4}
              />
            </div>
            <Button onClick={handleAddFeedback} className="w-full bg-primary hover:bg-primary/90">
              Save Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Client Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Client *</Label>
              <Select value={noteForm.clientId} onValueChange={(v) => setNoteForm({ ...noteForm, clientId: v })}>
                <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.company} — {c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Note *</Label>
              <Textarea
                value={noteForm.text}
                onChange={(e) => setNoteForm({ ...noteForm, text: e.target.value })}
                placeholder="Enter note about this client..."
                rows={4}
              />
            </div>
            <Button onClick={handleAddNote} className="w-full bg-primary hover:bg-primary/90">
              Save Note
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
