import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppStore } from '../../lib/store';
import { TrendingUp, Users, Shield, DollarSign } from 'lucide-react';

export default function Reports() {
  const { guards, clients, deployments, serviceRequests, trainees } = useAppStore();

  // Guard availability data
  const guardAvailabilityData = [
    { name: 'Available', value: guards.filter((g) => g.availability === 'available').length },
    { name: 'Deployed', value: guards.filter((g) => g.availability === 'deployed').length },
    { name: 'Training', value: guards.filter((g) => g.availability === 'training').length },
    { name: 'Off Duty', value: guards.filter((g) => g.availability === 'off-duty').length },
  ];

  // Service requests by status
  const requestStatusData = [
    { name: 'Pending', count: serviceRequests.filter((r) => r.status === 'pending').length },
    { name: 'Approved', count: serviceRequests.filter((r) => r.status === 'approved').length },
    { name: 'Rejected', count: serviceRequests.filter((r) => r.status === 'rejected').length },
    { name: 'Converted', count: serviceRequests.filter((r) => r.status === 'converted').length },
  ];

  // Training level distribution
  const trainingLevelData = [
    { name: 'Basic', count: guards.filter((g) => g.trainingLevel === 'Basic').length },
    { name: 'Intermediate', count: guards.filter((g) => g.trainingLevel === 'Intermediate').length },
    { name: 'Advanced', count: guards.filter((g) => g.trainingLevel === 'Advanced').length },
    { name: 'Expert', count: guards.filter((g) => g.trainingLevel === 'Expert').length },
  ];

  const COLORS = ['#BCA479', '#101C37', '#B4B6B7', '#e5d5ba'];

  const stats = [
    {
      title: 'Total Revenue',
      value: 'ETB 4,850,000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Active Clients',
      value: clients.filter((c) => c.status === 'active').length.toString(),
      change: '+8.2%',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Guards Deployed',
      value: guards.filter((g) => g.availability === 'deployed').length.toString(),
      change: '+5.1%',
      icon: Shield,
      color: 'text-primary',
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+2.3%',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Overview of operations, performance metrics, and key statistics
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <h3 className="text-2xl mb-1">{stat.value}</h3>
                    <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Guard Availability Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={guardAvailabilityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {guardAvailabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Request Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#BCA479" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <Card>
        <CardHeader>
          <CardTitle>Guard Training Level Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trainingLevelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#101C37" name="Number of Guards" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deployments.slice(0, 5).map((deployment) => {
                const guard = guards.find((g) => g.id === deployment.guardId);
                const client = clients.find((c) => c.id === deployment.clientId);
                return (
                  <div key={deployment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{guard?.name}</div>
                      <div className="text-sm text-muted-foreground">{client?.company}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(deployment.startDate).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trainees.slice(0, 5).map((trainee) => (
                <div key={trainee.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">{trainee.name}</div>
                    <div className="text-sm text-muted-foreground">{trainee.status}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary">{trainee.progress}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
