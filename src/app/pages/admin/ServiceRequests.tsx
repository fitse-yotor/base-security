import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { CheckCircle, XCircle, UserPlus, Eye } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner';

export default function ServiceRequests() {
  const { serviceRequests, updateServiceRequestStatus, convertRequestToClient } = useAppStore();
  const [selectedRequest, setSelectedRequest] = useState<typeof serviceRequests[0] | null>(null);

  const handleApprove = (id: string) => {
    updateServiceRequestStatus(id, 'approved');
    toast.success('Service request approved');
    setSelectedRequest(null);
  };

  const handleReject = (id: string) => {
    updateServiceRequestStatus(id, 'rejected');
    toast.success('Service request rejected');
    setSelectedRequest(null);
  };

  const handleConvert = (id: string) => {
    convertRequestToClient(id);
    toast.success('Request converted to client successfully');
    setSelectedRequest(null);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
      pending: { variant: 'secondary', label: 'Pending' },
      approved: { variant: 'default', label: 'Approved' },
      rejected: { variant: 'destructive', label: 'Rejected' },
      converted: { variant: 'outline', label: 'Converted' },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const stats = {
    pending: serviceRequests.filter((r) => r.status === 'pending').length,
    approved: serviceRequests.filter((r) => r.status === 'approved').length,
    rejected: serviceRequests.filter((r) => r.status === 'rejected').length,
    converted: serviceRequests.filter((r) => r.status === 'converted').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Service Requests</h1>
        <p className="text-muted-foreground">
          Manage incoming service requests from the website
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-primary mb-1">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-green-600 mb-1">{stats.approved}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-red-600 mb-1">{stats.rejected}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-blue-600 mb-1">{stats.converted}</div>
            <div className="text-sm text-muted-foreground">Converted to Client</div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Service Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Service Type</th>
                  <th className="text-left p-3">Location</th>
                  <th className="text-left p-3">Guards</th>
                  <th className="text-left p-3">Duration</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {serviceRequests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-8 text-muted-foreground">
                      No service requests yet
                    </td>
                  </tr>
                ) : (
                  serviceRequests.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-semibold">{request.name}</div>
                        <div className="text-sm text-muted-foreground">{request.email}</div>
                      </td>
                      <td className="p-3">{request.serviceType}</td>
                      <td className="p-3 text-sm">{request.location}</td>
                      <td className="p-3">{request.numberOfGuards}</td>
                      <td className="p-3">{request.duration}</td>
                      <td className="p-3">{getStatusBadge(request.status)}</td>
                      <td className="p-3 text-sm">
                        {new Date(request.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
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

      {/* Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Service Request Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-semibold">{selectedRequest.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div>{getStatusBadge(selectedRequest.status)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div>{selectedRequest.email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div>{selectedRequest.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Service Type</div>
                  <div>{selectedRequest.serviceType}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Number of Guards</div>
                  <div>{selectedRequest.numberOfGuards}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div>{selectedRequest.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Submitted</div>
                  <div>{new Date(selectedRequest.submittedAt).toLocaleDateString()}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Location</div>
                <div>{selectedRequest.location}</div>
              </div>
              {selectedRequest.specialRequirements && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Special Requirements</div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {selectedRequest.specialRequirements}
                  </div>
                </div>
              )}
              
              {selectedRequest.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(selectedRequest.id)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
              
              {selectedRequest.status === 'approved' && (
                <Button
                  onClick={() => handleConvert(selectedRequest.id)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Convert to Client
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
