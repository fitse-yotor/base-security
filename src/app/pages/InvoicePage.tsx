/**
 * Feature 9: Invoice Generator — generate & print ETB invoices per client
 */
import { useState, useRef } from 'react';
import { FileText, Printer, Download, Search, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAppStore } from '../lib/store';
import { BaseLogo } from '../components/BaseLogo';

function formatETB(n: number) {
  return `ETB ${n.toLocaleString('en-ET', { minimumFractionDigits: 2 })}`;
}

export default function InvoicePage() {
  const { clients, guards, deployments } = useAppStore();
  const [selectedClientId, setSelectedClientId] = useState('');
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });
  const [generated, setGenerated] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const client = clients.find((c) => c.id === selectedClientId);
  const clientGuards = client ? guards.filter((g) => client.assignedGuards.includes(g.id)) : [];
  const clientDeployments = client ? deployments.filter((d) => d.clientId === client.id) : [];

  const invoiceNumber = `INV-${selectedClientId.toUpperCase()}-${month.replace('-', '')}`;
  const monthlyRate = client?.monthlyRate || 0;
  const tax = Math.round(monthlyRate * 0.15);
  const total = monthlyRate + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <section className="bg-secondary text-white py-20 print:hidden">
        <div className="container mx-auto px-4 text-center">
          <FileText className="w-14 h-14 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Invoice Generator</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Generate and print monthly ETB invoices for any client.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 print:hidden">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" /> Generate Invoice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Client *</Label>
                <Select value={selectedClientId} onValueChange={(v) => { setSelectedClientId(v); setGenerated(false); }}>
                  <SelectTrigger><SelectValue placeholder="Choose a client" /></SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.company} — {c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Invoice Month *</Label>
                <Input type="month" value={month} onChange={(e) => { setMonth(e.target.value); setGenerated(false); }} />
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={!selectedClientId}
                onClick={() => setGenerated(true)}
              >
                <FileText className="w-4 h-4 mr-2" /> Generate Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Invoice Preview */}
      {generated && client && (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Action buttons */}
            <div className="flex gap-3 mb-6 print:hidden">
              <Button onClick={handlePrint} className="bg-secondary hover:bg-secondary/90 text-white">
                <Printer className="w-4 h-4 mr-2" /> Print Invoice
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Download className="w-4 h-4 mr-2" /> Save as PDF
              </Button>
            </div>

            {/* Invoice document */}
            <div ref={invoiceRef} className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-xl print:shadow-none print:border-0 print:rounded-none">
              {/* Header */}
              <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-100">
                <div className="flex items-center gap-4">
                  <BaseLogo className="w-16 h-16" />
                  <div>
                    <div className="font-black text-secondary text-lg">BASE SECURITY</div>
                    <div className="text-xs font-semibold" style={{ color: '#BCA479' }}>CLEANING & TRADING PLC</div>
                    <div className="text-xs text-muted-foreground mt-1">Megenagna City Square Mall, 10th Floor</div>
                    <div className="text-xs text-muted-foreground">Addis Abeba, Ethiopia</div>
                    <div className="text-xs text-muted-foreground">+251 91 123 4038 | basesc4@gmail.com</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-primary">INVOICE</div>
                  <div className="text-sm font-semibold text-secondary mt-1">{invoiceNumber}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Date: {new Date().toLocaleDateString('en-ET', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Period: {new Date(month + '-01').toLocaleDateString('en-ET', { year: 'numeric', month: 'long' })}
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Bill To</div>
                  <div className="font-bold text-secondary">{client.company}</div>
                  <div className="text-sm">{client.name}</div>
                  <div className="text-sm text-muted-foreground">{client.location}</div>
                  <div className="text-sm text-muted-foreground">{client.email}</div>
                  <div className="text-sm text-muted-foreground">{client.phone}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Service Details</div>
                  <div className="text-sm"><span className="text-muted-foreground">Service:</span> <span className="font-semibold">{client.serviceType}</span></div>
                  <div className="text-sm"><span className="text-muted-foreground">Guards Assigned:</span> <span className="font-semibold">{clientGuards.length}</span></div>
                  <div className="text-sm"><span className="text-muted-foreground">Contract Status:</span> <span className="font-semibold capitalize">{client.status}</span></div>
                </div>
              </div>

              {/* Line items */}
              <table className="w-full mb-6">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="text-left p-3 text-sm rounded-tl-lg">Description</th>
                    <th className="text-center p-3 text-sm">Qty</th>
                    <th className="text-right p-3 text-sm">Unit Price</th>
                    <th className="text-right p-3 text-sm rounded-tr-lg">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-sm">
                      <div className="font-semibold">{client.serviceType}</div>
                      <div className="text-xs text-muted-foreground">Monthly service fee — {new Date(month + '-01').toLocaleDateString('en-ET', { month: 'long', year: 'numeric' })}</div>
                    </td>
                    <td className="p-3 text-center text-sm">1</td>
                    <td className="p-3 text-right text-sm">{formatETB(monthlyRate)}</td>
                    <td className="p-3 text-right text-sm font-semibold">{formatETB(monthlyRate)}</td>
                  </tr>
                  {clientGuards.map((guard) => (
                    <tr key={guard.id} className="border-b bg-gray-50">
                      <td className="p-3 text-sm">
                        <div className="font-medium">{guard.name} ({guard.employeeId})</div>
                        <div className="text-xs text-muted-foreground">{guard.trainingLevel} Guard · {guard.availability}</div>
                      </td>
                      <td className="p-3 text-center text-sm">1</td>
                      <td className="p-3 text-right text-sm text-muted-foreground">Included</td>
                      <td className="p-3 text-right text-sm text-muted-foreground">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatETB(monthlyRate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (15%)</span>
                    <span>{formatETB(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t-2 pt-2 border-secondary">
                    <span>Total Due</span>
                    <span className="text-primary">{formatETB(total)}</span>
                  </div>
                </div>
              </div>

              {/* Payment info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl text-sm">
                <div className="font-bold mb-2">Payment Instructions</div>
                <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                  <div>Bank: Commercial Bank of Ethiopia</div>
                  <div>Account Name: BASE SECURITY, CLEANING & TRADING PLC</div>
                  <div>Payment Due: Within 30 days</div>
                  <div>Reference: {invoiceNumber}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
                <p>Thank you for your business. For queries contact basesc4@gmail.com or +251 91 123 4038</p>
                <p className="mt-1">BASE SECURITY, CLEANING & TRADING PLC · Megenagna City Square Mall, 10th Floor, Addis Abeba</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
