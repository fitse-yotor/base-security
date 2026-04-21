import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Search, Edit, Eye } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner';

export default function ClientManagement() {
  const { clients, guards, addClient, updateClient } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    location: '',
    status: 'active' as 'active' | 'inactive',
    monthlyRate: '',
    contractEnd: '',
    nextFollowUp: '',
  });

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    addClient({
      ...formData,
      contractStart: new Date(),
      contractEnd: formData.contractEnd ? new Date(formData.contractEnd) : undefined,
      monthlyRate: formData.monthlyRate ? parseFloat(formData.monthlyRate) : undefined,
      nextFollowUp: formData.nextFollowUp ? new Date(formData.nextFollowUp) : undefined,
      assignedGuards: [],
      notes: [],
      feedback: [],
    });
    toast.success('Client added successfully');
    setShowAddDialog(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      serviceType: '',
      location: '',
      status: 'active',
      monthlyRate: '',
      contractEnd: '',
      nextFollowUp: '',
    });
  };

  const getGuardNames = (guardIds: string[]) => {
    return guardIds
      .map((id) => guards.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl mb-2">Client Management</h1>
          <p className="text-muted-foreground">Manage your clients and service contracts</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-primary mb-1">{clients.length}</div>
            <div className="text-sm text-muted-foreground">Total Clients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-green-600 mb-1">
              {clients.filter((c) => c.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">Active Contracts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-orange-600 mb-1">
              {clients.filter((c) => c.status === 'inactive').length}
            </div>
            <div className="text-sm text-muted-foreground">Inactive</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Client</th>
                  <th className="text-left p-3">Service Type</th>
                  <th className="text-left p-3">Location</th>
                  <th className="text-left p-3">Monthly Rate</th>
                  <th className="text-left p-3">Contract End</th>
                  <th className="text-left p-3">Next Follow-up</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-muted-foreground">
                      No clients found
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => (
                    <tr key={client.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-semibold">{client.name}</div>
                        <div className="text-sm text-muted-foreground">{client.company}</div>
                        <div className="text-xs text-muted-foreground">{client.email}</div>
                      </td>
                      <td className="p-3">{client.serviceType}</td>
                      <td className="p-3 text-sm">{client.location}</td>
                      <td className="p-3 text-sm font-semibold text-primary">
                        {client.monthlyRate ? `ETB ${client.monthlyRate.toLocaleString()}` : '—'}
                      </td>
                      <td className="p-3 text-sm">
                        {client.contractEnd
                          ? (() => {
                              const daysLeft = Math.ceil((new Date(client.contractEnd).getTime() - Date.now()) / 86400000);
                              return (
                                <span className={daysLeft <= 30 ? 'text-red-600 font-semibold' : ''}>
                                  {new Date(client.contractEnd).toLocaleDateString()}
                                  {daysLeft <= 30 && ` (${daysLeft}d left)`}
                                </span>
                              );
                            })()
                          : '—'}
                      </td>
                      <td className="p-3 text-sm">
                        {client.nextFollowUp ? (
                          <span className={new Date(client.nextFollowUp) <= new Date() ? 'text-orange-600 font-semibold' : ''}>
                            {new Date(client.nextFollowUp).toLocaleDateString()}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="p-3">
                        <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                          {client.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedClient(client)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Client Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private Security (VIP)">Private Security (VIP)</SelectItem>
                    <SelectItem value="Office & Building Security">Office & Building Security</SelectItem>
                    <SelectItem value="Housekeeping Services">Housekeeping Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'active' | 'inactive') =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Bole, Addis Abeba"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Monthly Rate (ETB)</Label>
                <Input
                  type="number"
                  value={formData.monthlyRate}
                  onChange={(e) => setFormData({ ...formData, monthlyRate: e.target.value })}
                  placeholder="45000"
                />
              </div>
              <div className="space-y-2">
                <Label>Contract End Date</Label>
                <Input
                  type="date"
                  value={formData.contractEnd}
                  onChange={(e) => setFormData({ ...formData, contractEnd: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Next Follow-up Date</Label>
              <Input
                type="date"
                value={formData.nextFollowUp}
                onChange={(e) => setFormData({ ...formData, nextFollowUp: e.target.value })}
              />
            </div>
            <Button onClick={handleAddClient} className="w-full bg-primary hover:bg-primary/90">
              Add Client
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Client Dialog */}
      {selectedClient && (
        <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Client Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-semibold">{selectedClient.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Company</div>
                  <div className="font-semibold">{selectedClient.company}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div>{selectedClient.email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div>{selectedClient.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Service Type</div>
                  <div>{selectedClient.serviceType}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge variant={selectedClient.status === 'active' ? 'default' : 'secondary'}>
                    {selectedClient.status}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div>{selectedClient.location}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Contract Start</div>
                  <div>{new Date(selectedClient.contractStart).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Assigned Guards</div>
                  <div>
                    {selectedClient.assignedGuards.length > 0
                      ? getGuardNames(selectedClient.assignedGuards)
                      : 'No guards assigned'}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
