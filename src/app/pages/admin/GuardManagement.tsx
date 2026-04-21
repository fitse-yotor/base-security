import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Search, Eye } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner';

export default function GuardManagement() {
  const { guards, clients, addGuard } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuard, setSelectedGuard] = useState<typeof guards[0] | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    phone: '',
    email: '',
    trainingLevel: 'Basic' as 'Basic' | 'Intermediate' | 'Advanced' | 'Expert',
    experience: '',
    availability: 'available' as 'available' | 'deployed' | 'training' | 'off-duty',
    certifications: [] as string[],
  });

  const filteredGuards = guards.filter(
    (guard) =>
      guard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guard.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guard.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGuard = () => {
    addGuard(formData);
    toast.success('Guard added successfully');
    setShowAddDialog(false);
    setFormData({
      name: '',
      employeeId: '',
      phone: '',
      email: '',
      trainingLevel: 'Basic',
      experience: '',
      availability: 'available',
      certifications: [],
    });
  };

  const getAvailabilityBadge = (availability: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
      available: { variant: 'default', label: 'Available' },
      deployed: { variant: 'secondary', label: 'Deployed' },
      training: { variant: 'outline', label: 'In Training' },
      'off-duty': { variant: 'destructive', label: 'Off Duty' },
    };
    const config = variants[availability] || variants.available;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getClientName = (guardId: string) => {
    const guard = guards.find((g) => g.id === guardId);
    if (!guard?.assignedTo) return 'Not assigned';
    const client = clients.find((c) => c.id === guard.assignedTo);
    return client?.company || 'Unknown';
  };

  const stats = {
    total: guards.length,
    available: guards.filter((g) => g.availability === 'available').length,
    deployed: guards.filter((g) => g.availability === 'deployed').length,
    training: guards.filter((g) => g.availability === 'training').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl mb-2">Guard Management</h1>
          <p className="text-muted-foreground">Manage security personnel and assignments</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Guard
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-primary mb-1">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Guards</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-green-600 mb-1">{stats.available}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-blue-600 mb-1">{stats.deployed}</div>
            <div className="text-sm text-muted-foreground">Deployed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-orange-600 mb-1">{stats.training}</div>
            <div className="text-sm text-muted-foreground">In Training</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search guards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Guards Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Security Guards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Guard</th>
                  <th className="text-left p-3">Employee ID</th>
                  <th className="text-left p-3">Training Level</th>
                  <th className="text-left p-3">Experience</th>
                  <th className="text-left p-3">Availability</th>
                  <th className="text-left p-3">Assigned To</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuards.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-muted-foreground">
                      No guards found
                    </td>
                  </tr>
                ) : (
                  filteredGuards.map((guard) => (
                    <tr key={guard.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-semibold">{guard.name}</div>
                        <div className="text-sm text-muted-foreground">{guard.email}</div>
                      </td>
                      <td className="p-3">{guard.employeeId}</td>
                      <td className="p-3">
                        <Badge variant="outline">{guard.trainingLevel}</Badge>
                      </td>
                      <td className="p-3">{guard.experience}</td>
                      <td className="p-3">{getAvailabilityBadge(guard.availability)}</td>
                      <td className="p-3 text-sm">{getClientName(guard.id)}</td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedGuard(guard)}
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

      {/* Add Guard Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Guard</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label>Employee ID</Label>
                <Input
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  placeholder="SEC-001"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@basesecurity.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+251 91 123 4567"
                />
              </div>
              <div className="space-y-2">
                <Label>Training Level</Label>
                <Select
                  value={formData.trainingLevel}
                  onValueChange={(value: typeof formData.trainingLevel) =>
                    setFormData({ ...formData, trainingLevel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Experience</Label>
                <Input
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="5 years"
                />
              </div>
            </div>
            <Button onClick={handleAddGuard} className="w-full bg-primary hover:bg-primary/90">
              Add Guard
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Guard Dialog */}
      {selectedGuard && (
        <Dialog open={!!selectedGuard} onOpenChange={() => setSelectedGuard(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Guard Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-semibold">{selectedGuard.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Employee ID</div>
                  <div className="font-semibold">{selectedGuard.employeeId}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div>{selectedGuard.email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div>{selectedGuard.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Training Level</div>
                  <Badge variant="outline">{selectedGuard.trainingLevel}</Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                  <div>{selectedGuard.experience}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Availability</div>
                  {getAvailabilityBadge(selectedGuard.availability)}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Assigned To</div>
                  <div>{getClientName(selectedGuard.id)}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Certifications</div>
                <div className="flex flex-wrap gap-2">
                  {selectedGuard.certifications.length > 0 ? (
                    selectedGuard.certifications.map((cert, i) => (
                      <Badge key={i} variant="secondary">
                        {cert}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No certifications</span>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
