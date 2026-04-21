import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { useAppStore } from '../../lib/store';

export default function TrainingManagement() {
  const { trainingPrograms, trainees } = useAppStore();

  const getTraineesInProgram = (programId: string) => {
    return trainees.filter((t) => t.programId === programId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Training Management</h1>
        <p className="text-muted-foreground">Manage training programs and track trainee progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-primary mb-1">{trainingPrograms.length}</div>
            <div className="text-sm text-muted-foreground">Active Programs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-green-600 mb-1">{trainees.length}</div>
            <div className="text-sm text-muted-foreground">Total Trainees</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl text-blue-600 mb-1">
              {trainees.filter((t) => t.status === 'completed').length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Training Programs */}
      <Card>
        <CardHeader>
          <CardTitle>Training Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {trainingPrograms.map((program) => (
              <div key={program.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{program.name}</h3>
                    <p className="text-muted-foreground mb-3">{program.description}</p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration:</span> {program.duration}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Start:</span>{' '}
                        {new Date(program.nextStartDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Enrolled:</span>{' '}
                        {getTraineesInProgram(program.id).length}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{program.duration}</Badge>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {program.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trainees */}
      <Card>
        <CardHeader>
          <CardTitle>Current Trainees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Trainee</th>
                  <th className="text-left p-3">Program</th>
                  <th className="text-left p-3">Progress</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Enrolled Date</th>
                </tr>
              </thead>
              <tbody>
                {trainees.map((trainee) => {
                  const program = trainingPrograms.find((p) => p.id === trainee.programId);
                  return (
                    <tr key={trainee.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-semibold">{trainee.name}</div>
                        <div className="text-sm text-muted-foreground">{trainee.email}</div>
                      </td>
                      <td className="p-3">{program?.name || 'Unknown'}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Progress value={trainee.progress} className="w-24" />
                          <span className="text-sm">{trainee.progress}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={
                            trainee.status === 'completed'
                              ? 'default'
                              : trainee.status === 'in-progress'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {trainee.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">
                        {new Date(trainee.enrolledDate).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
