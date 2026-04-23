import { useState } from 'react';
import { useCMSStore } from '../../../lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Plus, Trash2, Save, Phone, MapPin, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function CMSContactPage() {
  const { contactInfo, updateContactInfo, companyInfo, updateCompanyInfo } = useCMSStore();
  const [data, setData] = useState({ ...contactInfo, address: [...contactInfo.address], phone: [...contactInfo.phone], email: [...contactInfo.email], hours: [...contactInfo.hours] });
  const [company, setCompany] = useState({ ...companyInfo });

  const save = () => { updateContactInfo(data); updateCompanyInfo(company); toast.success('Contact info saved!'); };

  const updateArr = (field: 'address' | 'phone' | 'email' | 'hours', idx: number, val: string) => {
    const arr = [...data[field]]; arr[idx] = val; setData({ ...data, [field]: arr });
  };
  const addArr = (field: 'address' | 'phone' | 'email' | 'hours') => setData({ ...data, [field]: [...data[field], ''] });
  const removeArr = (field: 'address' | 'phone' | 'email' | 'hours', idx: number) => setData({ ...data, [field]: data[field].filter((_, i) => i !== idx) });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Phone className="w-6 h-6 text-primary" />
        <div><h1 className="text-3xl font-bold">Contact & Company CMS</h1><p className="text-muted-foreground">Manage contact info and company details</p></div>
      </div>

      <Card>
        <CardHeader><CardTitle>Company Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Company Name</Label><Input value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} /></div>
            <div className="space-y-1"><Label>WhatsApp Number (digits only)</Label><Input value={company.whatsappNumber} onChange={(e) => setCompany({ ...company, whatsappNumber: e.target.value })} placeholder="251911234038" /></div>
            <div className="space-y-1"><Label>Tagline (Amharic)</Label><Input value={company.taglineAmharic} onChange={(e) => setCompany({ ...company, taglineAmharic: e.target.value })} /></div>
            <div className="space-y-1"><Label>Tagline (English)</Label><Input value={company.taglineEnglish} onChange={(e) => setCompany({ ...company, taglineEnglish: e.target.value })} /></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />Address</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.address.map((a, i) => (
              <div key={i} className="flex gap-2">
                <Input value={a} onChange={(e) => updateArr('address', i, e.target.value)} />
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => removeArr('address', i)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArr('address')}><Plus className="w-4 h-4 mr-1" />Add Line</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" />Phone Numbers</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.phone.map((p, i) => (
              <div key={i} className="flex gap-2">
                <Input value={p} onChange={(e) => updateArr('phone', i, e.target.value)} />
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => removeArr('phone', i)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArr('phone')}><Plus className="w-4 h-4 mr-1" />Add Phone</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" />Email Addresses</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.email.map((e, i) => (
              <div key={i} className="flex gap-2">
                <Input value={e} onChange={(ev) => updateArr('email', i, ev.target.value)} />
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => removeArr('email', i)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArr('email')}><Plus className="w-4 h-4 mr-1" />Add Email</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />Business Hours</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.hours.map((h, i) => (
              <div key={i} className="flex gap-2">
                <Input value={h} onChange={(e) => updateArr('hours', i, e.target.value)} />
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => removeArr('hours', i)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArr('hours')}><Plus className="w-4 h-4 mr-1" />Add Hours</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Google Maps Embed URL</CardTitle></CardHeader>
        <CardContent>
          <Textarea value={data.mapEmbedUrl} onChange={(e) => setData({ ...data, mapEmbedUrl: e.target.value })} rows={3} placeholder="https://www.google.com/maps/embed?..." />
          {data.mapEmbedUrl && (
            <div className="mt-3 h-48 rounded-lg overflow-hidden border">
              <iframe src={data.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Map preview" />
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={save} className="bg-primary hover:bg-primary/90 text-white" size="lg"><Save className="w-4 h-4 mr-2" />Save All Changes</Button>
    </div>
  );
}
