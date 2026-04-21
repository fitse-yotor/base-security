/**
 * Feature 8: Client Self-Service Portal
 * Clients log in with email + company name to view their contract, guards, deployments, and submit feedback
 */
import { useState } from 'react';
import { Shield, LogOut, Users, Calendar, FileText, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { useAppStore } from '../lib/store';
import { toast } from 'sonner';
import { BaseLogo } from '../components/BaseLogo';

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)}>
          <Star className={`w-7 h-7 transition-colors ${s <= (hovered || value) ? 'fill-primary text-primary' : 'text-gray-300'}`} />
        </button>
      ))}
    </div>
  );
}

export default function ClientPortalPage() {
  const { clients, guards, deployments, addClientFeedback, addClientNote } = useAppStore();
  const [loggedIn, setLoggedIn] = useState(false);
  const [clientData, setClientData] = useState<typeof clients[0] | null>(null);
  const [loginForm, setLoginForm] = useState({ email: '', company: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'guards' | 'deployments' | 'feedback'>('overview');
  const [feedbackForm, setFeedbackForm] = useState({ rating: 0, comment: '' });
  const [noteText, setNoteText] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = clients.find(
      (c) =>
        c.email.toLowerCase() === loginForm.email.toLowerCase() &&
        c.company.toLowerCase().includes(loginForm.company.toLowerCase())
    );
    if (found) {
      setClientData(found);
      setLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('No account found with those details. Please contact BASE to set up your portal access.');
    }
  };

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientData || feedbackForm.rating === 0) { toast.error('Please select a rating'); return; }
    addClientFeedback(clientData.id, { rating: feedbackForm.rating as 1|2|3|4|5, comment: feedbackForm.comment });
    toast.success('Thank you for your feedback!');
    setFeedbackForm({ rating: 0, comment: '' });
  };

  const handleNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientData || !noteText.trim()) return;
    addClientNote(clientData.id, noteText);
    toast.success('Message sent to BASE team');
    setNoteText('');
  };

  const myGuards = clientData ? guards.filter((g) => clientData.assignedGuards.includes(g.id)) : [];
  const myDeployments = clientData ? deployments.filter((d) => d.clientId === clientData.id) : [];

  const TABS = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'guards', label: 'My Guards', icon: Users },
    { id: 'deployments', label: 'Deployments', icon: Calendar },
    { id: 'feedback', label: 'Feedback', icon: Star },
  ] as const;

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <BaseLogo className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-secondary">Client Portal</h1>
            <p className="text-muted-foreground text-sm mt-1">Sign in to view your contract and services</p>
          </div>
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="your@company.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" value={loginForm.company}
                    onChange={(e) => setLoginForm({ ...loginForm, company: e.target.value })}
                    placeholder="Your Company Name" required />
                </div>
                {loginError && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {loginError}
                  </div>
                )}
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Sign In to Portal
                </Button>
              </form>
              <p className="text-center text-xs text-muted-foreground mt-6">
                Demo: email <code className="bg-gray-100 px-1 rounded">security@ethiotelecom.com</code> / company <code className="bg-gray-100 px-1 rounded">Ethio Telecom</code>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Portal Header */}
      <header className="bg-secondary text-white py-4 px-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <BaseLogo className="w-10 h-10" />
          <div>
            <div className="font-bold text-sm">Client Portal</div>
            <div className="text-xs text-gray-300">{clientData?.company}</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-white hover:text-primary"
          onClick={() => { setLoggedIn(false); setClientData(null); }}>
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-secondary">Welcome, {clientData?.name}</h2>
          <p className="text-muted-foreground">{clientData?.company} · {clientData?.serviceType}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-8 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex-shrink-0 ${
                  activeTab === tab.id ? 'bg-primary text-white shadow' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                <Icon className="w-4 h-4" />{tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && clientData && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Assigned Guards', value: myGuards.length, icon: Users, color: 'text-blue-600' },
                { label: 'Active Deployments', value: myDeployments.filter(d => d.status === 'active').length, icon: Calendar, color: 'text-green-600' },
                { label: 'Contract Status', value: clientData.status === 'active' ? 'Active' : 'Inactive', icon: CheckCircle, color: clientData.status === 'active' ? 'text-green-600' : 'text-red-600' },
                { label: 'Monthly Rate', value: clientData.monthlyRate ? `ETB ${clientData.monthlyRate.toLocaleString()}` : 'N/A', icon: FileText, color: 'text-primary' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Card key={i}>
                    <CardContent className="p-5">
                      <Icon className={`w-6 h-6 ${stat.color} mb-2`} />
                      <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader><CardTitle>Contract Details</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {[
                    ['Service Type', clientData.serviceType],
                    ['Location', clientData.location],
                    ['Contract Start', new Date(clientData.contractStart).toLocaleDateString()],
                    ['Contract End', clientData.contractEnd ? new Date(clientData.contractEnd).toLocaleDateString() : 'Ongoing'],
                    ['Next Follow-up', clientData.nextFollowUp ? new Date(clientData.nextFollowUp).toLocaleDateString() : '—'],
                    ['Status', clientData.status],
                  ].map(([label, value], i) => (
                    <div key={i}>
                      <div className="text-muted-foreground">{label}</div>
                      <div className="font-semibold capitalize">{value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Send message */}
            <Card>
              <CardHeader><CardTitle>Send a Message to BASE</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleNote} className="flex gap-3">
                  <Textarea value={noteText} onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Type your message or request here..." rows={2} className="flex-1" />
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-white self-end">Send</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Guards Tab */}
        {activeTab === 'guards' && (
          <div className="space-y-4">
            {myGuards.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No guards currently assigned to your account.</CardContent></Card>
            ) : myGuards.map((guard) => (
              <Card key={guard.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{guard.name}</div>
                    <div className="text-sm text-muted-foreground">{guard.employeeId} · {guard.trainingLevel}</div>
                    <div className="text-sm text-muted-foreground">{guard.phone}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={guard.availability === 'deployed' ? 'default' : 'secondary'}>
                      {guard.availability}
                    </Badge>
                    {guard.performanceRating && (
                      <div className="flex items-center gap-1 mt-1 justify-end">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-xs font-semibold">{guard.performanceRating}/5</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Deployments Tab */}
        {activeTab === 'deployments' && (
          <div className="space-y-4">
            {myDeployments.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No deployments found.</CardContent></Card>
            ) : myDeployments.map((dep) => {
              const guard = guards.find((g) => g.id === dep.guardId);
              return (
                <Card key={dep.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <div className="font-bold">{guard?.name || 'Unknown Guard'}</div>
                        <div className="text-sm text-muted-foreground">{dep.location}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(dep.startDate).toLocaleDateString()} — {new Date(dep.endDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={dep.status === 'active' ? 'default' : dep.status === 'completed' ? 'secondary' : 'outline'}>
                          {dep.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">{dep.shift} shift</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && clientData && (
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Submit Feedback</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleFeedback} className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Overall Rating *</Label>
                    <StarPicker value={feedbackForm.rating} onChange={(v) => setFeedbackForm({ ...feedbackForm, rating: v })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Comments</Label>
                    <Textarea value={feedbackForm.comment}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                      placeholder="Tell us about your experience with BASE services..." rows={4} />
                  </div>
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">Submit Feedback</Button>
                </form>
              </CardContent>
            </Card>

            {clientData.feedback.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Your Previous Feedback</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {clientData.feedback.map((fb) => (
                    <div key={fb.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex gap-1 mb-2">
                        {[1,2,3,4,5].map((s) => <Star key={s} className={`w-4 h-4 ${s <= fb.rating ? 'fill-primary text-primary' : 'text-gray-300'}`} />)}
                      </div>
                      <p className="text-sm italic text-muted-foreground">"{fb.comment}"</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(fb.submittedAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
