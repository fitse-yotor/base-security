import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { format } from 'date-fns';

export default function DeploymentManagement() {
  const { deployments, guards, clients, addDeployment } = useAppStore();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    guardId: '',
    clientId: '',
    shift: 'day' as 'day' | 'night',
  });

  const availableGuards = guards.filter((g) => g.availability === 'available');

  const handleAddDeployment = () => {
    if (!startDate || !endDate) {
      toast.error('Please select start and end dates');
      return;
    }

    addDeployment({
      guardId: formData.guardId,
      clientId: formData.clientId,
      location: clients.find((c) => c.id === formData.clientId)?.location || '',
      shift: formData.shift,
      startDate,
      endDate,
      status: 'scheduled',
    });

    toast.success('Deployment scheduled successfully');
    setShowAddDialog(false);
    setFormData({ guardId: '', clientId: '', shift: 'day' });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const getGuardName = (guardId: string) => guards.find((g) => g.id === guardId)?.name || 'Unknown';
  const getClientName = (clientId: string) => clients.find((c) => c.id === clientId)?.company || 'Unknown';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl mb-2">Deployment Management</h1>
          <p className="text-muted-foreground">Assign guards to clients and manage schedules</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Deployment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-primary mb-1">{deployments.length}</div>
            <div className="text-sm text-muted-foreground">Total Deployments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-green-600 mb-1">
              {deployments.filter((d) => d.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-blue-600 mb-1">
              {deployments.filter((d) => d.status === 'scheduled').length}
            </div>
            <div className="text-sm text-muted-foreground">Scheduled</div>
          </CardContent>
        </Card>
      </div>

      {/* Deployments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Deployments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Guard</th>
                  <th className="text-left p-3">Client</th>
                  <th className="text-left p-3">Location</th>
                  <th className="text-left p-3">Shift</th>
                  <th className="text-left p-3">Start Date</th>
                  <th className="text-left p-3">End Date</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {deployments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-muted-foreground">
                      No deployments scheduled
                    </td>
                  </tr>
                ) : (
                  deployments.map((deployment) => (
                    <tr key={deployment.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{getGuardName(deployment.guardId)}</td>
                      <td className="p-3">{getClientName(deployment.clientId)}</td>
                      <td className="p-3 text-sm">{deployment.location}</td>
                      <td className="p-3">
                        <Badge variant="outline">{deployment.shift}</Badge>
                      </td>
                      <td className="p-3 text-sm">{new Date(deployment.startDate).toLocaleDateString()}</td>
                      <td className="p-3 text-sm">{new Date(deployment.endDate).toLocaleDateString()}</td>
                      <td className="p-3">
                        <Badge
                          variant={
                            deployment.status === 'active'
                              ? 'default'
                              : deployment.status === 'scheduled'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {deployment.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Deployment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule New Deployment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Guard</Label>
                <Select
                  value={formData.guardId}
                  onValueChange={(value) => setFormData({ ...formData, guardId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose guard" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableGuards.map((guard) => (
                      <SelectItem key={guard.id} value={guard.id}>
                        {guard.name} ({guard.employeeId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select Client</Label>
                <Select
                  value={formData.clientId}
                  onValueChange={(value) => setFormData({ ...formData, clientId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Shift</Label>
              <Select
                value={formData.shift}
                onValueChange={(value: 'day' | 'night') => setFormData({ ...formData, shift: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day Shift (7AM - 7PM)</SelectItem>
                  <SelectItem value="night">Night Shift (7PM - 7AM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 w-4 h-4" />
                      {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 w-4 h-4" />
                      {endDate ? format(endDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button onClick={handleAddDeployment} className="w-full bg-primary hover:bg-primary/90">
              Schedule Deployment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
