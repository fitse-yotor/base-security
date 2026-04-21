import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Search, CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner';

export default function AttendanceManagement() {
  const { guards, attendance, leaveRequests, addAttendance, updateAttendance, addLeaveRequest, updateLeaveRequest } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [formData, setFormData] = useState({
    guardId: '',
    checkIn: '',
    checkOut: '',
    status: 'present' as 'present' | 'absent' | 'late' | 'leave',
    notes: '',
  });
  const [leaveForm, setLeaveForm] = useState({
    guardId: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const todayAttendance = attendance.filter(
    (a) => new Date(a.date).toDateString() === new Date(selectedDate).toDateString()
  );

  const filteredGuards = guards.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendanceForGuard = (guardId: string) =>
    todayAttendance.find((a) => a.guardId === guardId);

  const getStatusBadge = (status: string) => {
    const map: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      present: { variant: 'default', label: 'Present' },
      absent: { variant: 'destructive', label: 'Absent' },
      late: { variant: 'outline', label: 'Late' },
      leave: { variant: 'secondary', label: 'On Leave' },
    };
    const cfg = map[status] || map.present;
    return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
  };

  const handleAddAttendance = () => {
    if (!formData.guardId) {
      toast.error('Please select a guard');
      return;
    }
    addAttendance({
      guardId: formData.guardId,
      date: new Date(selectedDate),
      checkIn: formData.checkIn || undefined,
      checkOut: formData.checkOut || undefined,
      status: formData.status,
      notes: formData.notes || undefined,
    });
    toast.success('Attendance recorded');
    setShowAddDialog(false);
    setFormData({ guardId: '', checkIn: '', checkOut: '', status: 'present', notes: '' });
  };

  const handleAddLeave = () => {
    if (!leaveForm.guardId || !leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason) {
      toast.error('Please fill all required fields');
      return;
    }
    addLeaveRequest({
      guardId: leaveForm.guardId,
      startDate: new Date(leaveForm.startDate),
      endDate: new Date(leaveForm.endDate),
      reason: leaveForm.reason,
      status: 'pending',
    });
    toast.success('Leave request submitted');
    setShowLeaveDialog(false);
    setLeaveForm({ guardId: '', startDate: '', endDate: '', reason: '' });
  };

  const stats = {
    present: todayAttendance.filter((a) => a.status === 'present').length,
    absent: todayAttendance.filter((a) => a.status === 'absent').length,
    late: todayAttendance.filter((a) => a.status === 'late').length,
    leave: todayAttendance.filter((a) => a.status === 'leave').length,
  };

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-3xl mb-2">Attendance & Leave</h1>
          <p className="text-muted-foreground">Track daily attendance and manage leave requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowLeaveDialog(true)}>
            <Calendar className="w-4 h-4 mr-2" />
            Add Leave Request
          </Button>
          <Button onClick={() => setShowAddDialog(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Record Attendance
          </Button>
        </div>
      </div>

      {/* Date Selector */}
      <div className="flex items-center gap-4">
        <Label>Date:</Label>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-48"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl text-green-600">{stats.present}</div>
                <div className="text-sm text-muted-foreground">Present</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-500" />
              <div>
                <div className="text-2xl text-red-600">{stats.absent}</div>
                <div className="text-sm text-muted-foreground">Absent</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-500" />
              <div>
                <div className="text-2xl text-orange-600">{stats.late}</div>
                <div className="text-sm text-muted-foreground">Late</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl text-blue-600">{stats.leave}</div>
                <div className="text-sm text-muted-foreground">On Leave</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daily Attendance Log</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search guards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Guard</th>
                  <th className="text-left p-3">Employee ID</th>
                  <th className="text-left p-3">Check In</th>
                  <th className="text-left p-3">Check Out</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuards.map((guard) => {
                  const record = getAttendanceForGuard(guard.id);
                  return (
                    <tr key={guard.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-semibold">{guard.name}</div>
                        <div className="text-xs text-muted-foreground">{guard.phone}</div>
                      </td>
                      <td className="p-3">{guard.employeeId}</td>
                      <td className="p-3">{record?.checkIn || '—'}</td>
                      <td className="p-3">{record?.checkOut || '—'}</td>
                      <td className="p-3">
                        {record ? getStatusBadge(record.status) : <Badge variant="outline">Not Recorded</Badge>}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{record?.notes || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pending Leave Requests */}
      {pendingLeaves.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingLeaves.map((leave) => {
                const guard = guards.find((g) => g.id === leave.guardId);
                return (
                  <div key={leave.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{guard?.name || 'Unknown Guard'}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(leave.startDate).toLocaleDateString()} — {new Date(leave.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm">{leave.reason}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          updateLeaveRequest(leave.id, 'approved');
                          toast.success('Leave approved');
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          updateLeaveRequest(leave.id, 'rejected');
                          toast.success('Leave rejected');
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Attendance Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Record Attendance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Guard *</Label>
              <Select value={formData.guardId} onValueChange={(v) => setFormData({ ...formData, guardId: v })}>
                <SelectTrigger><SelectValue placeholder="Select guard" /></SelectTrigger>
                <SelectContent>
                  {guards.map((g) => (
                    <SelectItem key={g.id} value={g.id}>{g.name} ({g.employeeId})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Check In Time</Label>
                <Input type="time" value={formData.checkIn} onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Check Out Time</Label>
                <Input type="time" value={formData.checkOut} onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status *</Label>
              <Select value={formData.status} onValueChange={(v: typeof formData.status) => setFormData({ ...formData, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Input value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Optional notes" />
            </div>
            <Button onClick={handleAddAttendance} className="w-full bg-primary hover:bg-primary/90">
              Record Attendance
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Leave Dialog */}
      <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit Leave Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Guard *</Label>
              <Select value={leaveForm.guardId} onValueChange={(v) => setLeaveForm({ ...leaveForm, guardId: v })}>
                <SelectTrigger><SelectValue placeholder="Select guard" /></SelectTrigger>
                <SelectContent>
                  {guards.map((g) => (
                    <SelectItem key={g.id} value={g.id}>{g.name} ({g.employeeId})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input type="date" value={leaveForm.startDate} onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input type="date" value={leaveForm.endDate} onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason *</Label>
              <Input value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} placeholder="Reason for leave" />
            </div>
            <Button onClick={handleAddLeave} className="w-full bg-primary hover:bg-primary/90">
              Submit Leave Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
