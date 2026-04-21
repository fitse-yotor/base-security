/**
 * Feature 2: Service Request Progress Tracker
 * Clients enter their reference number to check status
 */
import { useState } from 'react';
import { Search, CheckCircle, Clock, XCircle, ArrowRight, Shield, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { useAppStore } from '../lib/store';

const STATUS_STEPS = ['pending', 'approved', 'converted'] as const;

const STATUS_CONFIG = {
  pending:   { label: 'Under Review',  color: 'bg-yellow-500', icon: Clock,        text: 'Your request has been received and is being reviewed by our team.' },
  approved:  { label: 'Approved',      color: 'bg-blue-500',   icon: CheckCircle,  text: 'Your request has been approved. Our team will contact you shortly to finalise details.' },
  rejected:  { label: 'Not Approved',  color: 'bg-red-500',    icon: XCircle,      text: 'Unfortunately we could not fulfil this request. Please contact us for alternatives.' },
  converted: { label: 'Service Active',color: 'bg-green-600',  icon: CheckCircle,  text: 'Your service is now active. Welcome to the BASE family!' },
};

export default function RequestTrackingPage() {
  const { serviceRequests } = useAppStore();
  const [refInput, setRefInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [result, setResult] = useState<typeof serviceRequests[0] | null | 'not-found'>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = serviceRequests.find(
      (r) =>
        r.id.toLowerCase() === refInput.trim().toLowerCase() ||
        (r.email.toLowerCase() === emailInput.trim().toLowerCase() && emailInput.trim() !== '')
    );
    setResult(found ?? 'not-found');
  };

  const stepIndex = result && result !== 'not-found'
    ? result.status === 'rejected' ? -1
    : STATUS_STEPS.indexOf(result.status as typeof STATUS_STEPS[number])
    : -1;

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-14 h-14 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Request</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enter your reference number or email address to check the status of your service request.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Search Form */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Find Your Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ref">Reference Number</Label>
                  <Input
                    id="ref"
                    value={refInput}
                    onChange={(e) => setRefInput(e.target.value)}
                    placeholder="e.g. req-1234567890"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-sm text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address used in request</Label>
                  <Input
                    id="email"
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Track Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo hint */}
          <p className="text-center text-sm text-muted-foreground mb-8">
            Demo: try reference <code className="bg-gray-100 px-2 py-0.5 rounded">1</code> or email <code className="bg-gray-100 px-2 py-0.5 rounded">abebe.girma@company.com</code>
          </p>

          {/* Result */}
          {result === 'not-found' && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6 text-center">
                <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Request Not Found</h3>
                <p className="text-muted-foreground text-sm">
                  We couldn't find a request matching that reference or email. Please double-check and try again, or <a href="/contact" className="text-primary underline">contact us</a>.
                </p>
              </CardContent>
            </Card>
          )}

          {result && result !== 'not-found' && (
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle>Request Details</CardTitle>
                  <Badge
                    className="text-white text-sm px-3 py-1"
                    style={{ backgroundColor: result.status === 'converted' ? '#16a34a' : result.status === 'approved' ? '#2563eb' : result.status === 'rejected' ? '#dc2626' : '#d97706' }}
                  >
                    {STATUS_CONFIG[result.status].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Info grid */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Name:</span><div className="font-semibold">{result.name}</div></div>
                  <div><span className="text-muted-foreground">Service:</span><div className="font-semibold">{result.serviceType}</div></div>
                  <div><span className="text-muted-foreground">Location:</span><div className="font-semibold">{result.location}</div></div>
                  <div><span className="text-muted-foreground">Submitted:</span><div className="font-semibold">{new Date(result.submittedAt).toLocaleDateString()}</div></div>
                </div>

                {/* Progress stepper */}
                {result.status !== 'rejected' && (
                  <div>
                    <p className="text-sm font-semibold mb-4">Progress</p>
                    <div className="flex items-center gap-0">
                      {STATUS_STEPS.map((step, i) => {
                        const done = i <= stepIndex;
                        const active = i === stepIndex;
                        return (
                          <div key={step} className="flex items-center flex-1">
                            <div className="flex flex-col items-center flex-shrink-0">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all ${done ? 'bg-primary shadow-lg scale-110' : 'bg-gray-200 text-gray-400'}`}>
                                {done ? <CheckCircle className="w-5 h-5" /> : i + 1}
                              </div>
                              <span className={`text-xs mt-1 text-center w-20 ${active ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                                {STATUS_CONFIG[step].label}
                              </span>
                            </div>
                            {i < STATUS_STEPS.length - 1 && (
                              <div className={`flex-1 h-1 mx-1 rounded transition-all ${i < stepIndex ? 'bg-primary' : 'bg-gray-200'}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Status message */}
                <div className={`p-4 rounded-lg text-sm ${result.status === 'rejected' ? 'bg-red-50 text-red-700' : result.status === 'converted' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                  {STATUS_CONFIG[result.status].text}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => { setResult(null); setRefInput(''); setEmailInput(''); }} className="flex-1">
                    <RefreshCw className="w-4 h-4 mr-2" /> New Search
                  </Button>
                  <a href="/contact" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
