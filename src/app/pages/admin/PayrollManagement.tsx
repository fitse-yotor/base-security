import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Search, DollarSign, TrendingUp, Users, Edit2, Check, X } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { toast } from 'sonner';

export default function PayrollManagement() {
  const { guards, updateGuard } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSalary, setEditSalary] = useState('');

  const filteredGuards = guards.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayroll = guards.reduce((sum, g) => sum + (g.monthlySalary || 0), 0);
  const avgSalary = guards.length > 0 ? totalPayroll / guards.length : 0;
  const highestPaid = guards.reduce((max, g) => ((g.monthlySalary || 0) > (max.monthlySalary || 0) ? g : max), guards[0]);

  const formatETB = (amount: number) =>
    `ETB ${amount.toLocaleString('en-ET')}`;

  const handleSaveSalary = (guardId: string) => {
    const salary = parseFloat(editSalary);
    if (isNaN(salary) || salary < 0) {
      toast.error('Please enter a valid salary amount');
      return;
    }
    updateGuard(guardId, { monthlySalary: salary });
    toast.success('Salary updated successfully');
    setEditingId(null);
    setEditSalary('');
  };

  const getPerformanceBadge = (rating?: number) => {
    if (!rating) return <Badge variant="outline">Not Rated</Badge>;
    if (rating >= 4.5) return <Badge className="bg-green-600 text-white">Excellent</Badge>;
    if (rating >= 4.0) return <Badge className="bg-blue-600 text-white">Good</Badge>;
    if (rating >= 3.5) return <Badge variant="outline">Average</Badge>;
    return <Badge variant="destructive">Needs Improvement</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Payroll Management</h1>
        <p className="text-muted-foreground">Manage monthly salaries and performance ratings in ETB</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Monthly Payroll</div>
                <div className="text-2xl font-semibold text-primary">{formatETB(totalPayroll)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Average Salary</div>
                <div className="text-2xl font-semibold text-blue-600">{formatETB(Math.round(avgSalary))}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Guards on Payroll</div>
                <div className="text-2xl font-semibold text-green-600">{guards.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search guards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>Guard Salary Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Guard</th>
                  <th className="text-left p-3">Employee ID</th>
                  <th className="text-left p-3">Training Level</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Performance</th>
                  <th className="text-left p-3">Leave Balance</th>
                  <th className="text-left p-3">Monthly Salary (ETB)</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuards.map((guard) => (
                  <tr key={guard.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-semibold">{guard.name}</div>
                      <div className="text-xs text-muted-foreground">{guard.email}</div>
                    </td>
                    <td className="p-3">{guard.employeeId}</td>
                    <td className="p-3">
                      <Badge variant="outline">{guard.trainingLevel}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          guard.availability === 'available'
                            ? 'default'
                            : guard.availability === 'deployed'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {guard.availability}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getPerformanceBadge(guard.performanceRating)}
                        {guard.performanceRating && (
                          <span className="text-sm text-muted-foreground">({guard.performanceRating}/5)</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm">{guard.leaveBalance ?? 0} days</span>
                    </td>
                    <td className="p-3">
                      {editingId === guard.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={editSalary}
                            onChange={(e) => setEditSalary(e.target.value)}
                            className="w-32 h-8"
                            placeholder="Amount"
                          />
                        </div>
                      ) : (
                        <span className="font-semibold text-primary">
                          {guard.monthlySalary ? formatETB(guard.monthlySalary) : 'Not set'}
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {editingId === guard.id ? (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white h-8 w-8 p-0"
                            onClick={() => handleSaveSalary(guard.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => { setEditingId(null); setEditSalary(''); }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(guard.id);
                            setEditSalary(guard.monthlySalary?.toString() || '');
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-muted-foreground">Total Guards</span>
                <span className="font-semibold">{guards.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-muted-foreground">Total Monthly Payroll</span>
                <span className="font-semibold text-primary">{formatETB(totalPayroll)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-muted-foreground">Average Salary</span>
                <span className="font-semibold">{formatETB(Math.round(avgSalary))}</span>
              </div>
              {highestPaid && (
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-muted-foreground">Highest Paid</span>
                  <span className="font-semibold">{highestPaid.name} — {formatETB(highestPaid.monthlySalary || 0)}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-muted-foreground">Deployed Guards</span>
                <span className="font-semibold">{guards.filter((g) => g.availability === 'deployed').length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-muted-foreground">Available Guards</span>
                <span className="font-semibold">{guards.filter((g) => g.availability === 'available').length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-muted-foreground">In Training</span>
                <span className="font-semibold">{guards.filter((g) => g.availability === 'training').length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                <span className="font-semibold">Annual Payroll Estimate</span>
                <span className="font-semibold text-primary">{formatETB(totalPayroll * 12)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
