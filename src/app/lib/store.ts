import { create } from 'zustand';

// Types
export interface ServiceRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  location: string;
  numberOfGuards: number;
  duration: string;
  specialRequirements: string;
  status: 'pending' | 'approved' | 'rejected' | 'converted';
  submittedAt: Date;
}

export interface ClientNote {
  id: string;
  text: string;
  createdAt: Date;
}

export interface ClientFeedback {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  submittedAt: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  location: string;
  contractStart: Date;
  contractEnd?: Date;
  monthlyRate?: number;
  status: 'active' | 'inactive';
  assignedGuards: string[];
  lastContactDate?: Date;
  nextFollowUp?: Date;
  notes: ClientNote[];
  feedback: ClientFeedback[];
}

export interface Guard {
  id: string;
  name: string;
  employeeId: string;
  phone: string;
  email: string;
  trainingLevel: string;
  experience: string;
  availability: 'available' | 'deployed' | 'training' | 'off-duty';
  certifications: string[];
  assignedTo?: string;
  monthlySalary?: number;
  performanceRating?: number;
  leaveBalance?: number;
}

export interface AttendanceRecord {
  id: string;
  guardId: string;
  date: Date;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  guardId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

export interface Deployment {
  id: string;
  guardId: string;
  clientId: string;
  location: string;
  shift: 'day' | 'night';
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'scheduled';
  performanceRating?: number;
}

export interface TrainingProgram {
  id: string;
  name: string;
  duration: string;
  requirements: string[];
  description: string;
  nextStartDate: Date;
  enrolledTrainees: string[];
}

export interface Trainee {
  id: string;
  name: string;
  email: string;
  phone: string;
  programId: string;
  progress: number;
  status: 'enrolled' | 'in-progress' | 'completed';
  enrolledDate: Date;
}

export interface Notification {
  id: string;
  type: 'contract_expiry' | 'follow_up' | 'pending_request' | 'absent_guard' | 'leave_request';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  linkTo?: string;
}

interface AppStore {
  // Service Requests
  serviceRequests: ServiceRequest[];
  addServiceRequest: (request: Omit<ServiceRequest, 'id' | 'submittedAt'>) => Promise<void>;
  updateServiceRequestStatus: (id: string, status: ServiceRequest['status']) => Promise<void>;
  convertRequestToClient: (requestId: string) => Promise<void>;

  // Clients
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => Promise<void>;
  updateClient: (id: string, updates: Partial<Client>) => Promise<void>;
  addClientNote: (clientId: string, text: string) => Promise<void>;
  addClientFeedback: (clientId: string, feedback: Omit<ClientFeedback, 'id' | 'submittedAt'>) => Promise<void>;

  // Guards
  guards: Guard[];
  addGuard: (guard: Omit<Guard, 'id'>) => Promise<void>;
  updateGuard: (id: string, updates: Partial<Guard>) => Promise<void>;

  // Attendance
  attendance: AttendanceRecord[];
  addAttendance: (record: Omit<AttendanceRecord, 'id'>) => Promise<void>;
  updateAttendance: (id: string, updates: Partial<AttendanceRecord>) => Promise<void>;

  // Leave Requests
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'submittedAt'>) => Promise<void>;
  updateLeaveRequest: (id: string, status: LeaveRequest['status']) => Promise<void>;

  // Deployments
  deployments: Deployment[];
  addDeployment: (deployment: Omit<Deployment, 'id'>) => Promise<void>;
  updateDeployment: (id: string, updates: Partial<Deployment>) => Promise<void>;

  // Training Programs
  trainingPrograms: TrainingProgram[];
  addTrainingProgram: (program: Omit<TrainingProgram, 'id'>) => Promise<void>;

  // Trainees
  trainees: Trainee[];
  addTrainee: (trainee: Omit<Trainee, 'id'>) => Promise<void>;
  updateTraineeProgress: (id: string, progress: number) => Promise<void>;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => Promise<void>;

  fetchAppData: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function toCamel(s: string): string {
  return s.replace(/([-_][a-z])/g, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

function toSnake(s: string): string {
  return s.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function keysToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamel(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [toCamel(key)]: keysToCamel(obj[key]),
      }),
      {}
    );
  }
  return obj;
}

export function keysToSnake(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToSnake(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [toSnake(key)]: keysToSnake(obj[key]),
      }),
      {}
    );
  }
  return obj;
}

async function fetchJson(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

function parseClient(c: any): Client {
  return {
    ...keysToCamel(c),
    contractStart: c.contract_start ? new Date(c.contract_start) : new Date(),
    contractEnd: c.contract_end ? new Date(c.contract_end) : undefined,
    lastContactDate: c.last_contact_date ? new Date(c.last_contact_date) : undefined,
    nextFollowUp: c.next_follow_up ? new Date(c.next_follow_up) : undefined,
    assignedGuards: c.guards ? c.guards.map((g: any) => String(g.id)) : [],
    notes: (c.notes || []).map((n: any) => ({ ...keysToCamel(n), createdAt: new Date(n.created_at || n.createdAt) })),
    feedback: (c.feedback || []).map((f: any) => ({ ...keysToCamel(f), submittedAt: new Date(f.submitted_at || f.created_at || f.submittedAt) })),
  };
}

export const useAppStore = create<AppStore>((set) => ({
  serviceRequests: [],
  clients: [],
  guards: [],
  attendance: [],
  leaveRequests: [],
  deployments: [],
  trainingPrograms: [],
  trainees: [],
  notifications: [],

  addServiceRequest: async (request) => {
    const res = await fetchJson('/api/service-requests', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(request)),
    });
    set((state) => ({
      serviceRequests: [...state.serviceRequests, { ...keysToCamel(res), submittedAt: new Date(res.submitted_at || res.created_at) }],
    }));
  },

  updateServiceRequestStatus: async (id, status) => {
    const res = await fetchJson(`/api/service-requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    set((state) => ({
      serviceRequests: state.serviceRequests.map((req) =>
        req.id === String(id) ? { ...req, status: res.status } : req
      ),
    }));
  },

  convertRequestToClient: async (requestId) => {
    const res = await fetchJson(`/api/service-requests/${requestId}/convert`, {
      method: 'POST',
    });
    // The response is the new client object
    const newClient = parseClient(res);
    set((state) => ({
      serviceRequests: state.serviceRequests.map((req) =>
        req.id === String(requestId) ? { ...req, status: 'converted' } : req
      ),
      clients: [...state.clients, newClient],
    }));
  },

  addClient: async (client) => {
    const res = await fetchJson('/api/clients', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(client)),
    });
    set((state) => ({
      clients: [...state.clients, parseClient(res)],
    }));
  },

  updateClient: async (id, updates) => {
    const res = await fetchJson(`/api/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(updates)),
    });
    set((state) => ({
      clients: state.clients.map((c) => (c.id === String(id) ? parseClient(res) : c)),
    }));
  },

  addClientNote: async (clientId, text) => {
    const res = await fetchJson(`/api/clients/${clientId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    set((state) => ({
      clients: state.clients.map((c) =>
        c.id === String(clientId)
          ? {
              ...c,
              notes: [...c.notes, { ...keysToCamel(res), createdAt: new Date(res.created_at || res.createdAt) }],
            }
          : c
      ),
    }));
  },

  addClientFeedback: async (clientId, feedback) => {
    const res = await fetchJson(`/api/clients/${clientId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(keysToSnake(feedback)),
    });
    set((state) => ({
      clients: state.clients.map((c) =>
        c.id === String(clientId)
          ? {
              ...c,
              feedback: [...c.feedback, { ...keysToCamel(res), submittedAt: new Date(res.submitted_at || res.created_at || res.submittedAt) }],
            }
          : c
      ),
    }));
  },

  addGuard: async (guard) => {
    const res = await fetchJson('/api/guards', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(guard)),
    });
    set((state) => ({
      guards: [...state.guards, keysToCamel(res)],
    }));
  },

  updateGuard: async (id, updates) => {
    const res = await fetchJson(`/api/guards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(updates)),
    });
    set((state) => ({
      guards: state.guards.map((g) => (g.id === String(id) ? keysToCamel(res) : g)),
    }));
  },

  addAttendance: async (record) => {
    const res = await fetchJson('/api/attendance', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(record)),
    });
    set((state) => ({
      attendance: [...state.attendance, { ...keysToCamel(res), date: new Date(res.date) }],
    }));
  },

  updateAttendance: async (id, updates) => {
    const res = await fetchJson(`/api/attendance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(updates)),
    });
    set((state) => ({
      attendance: state.attendance.map((rec) =>
        rec.id === String(id) ? { ...keysToCamel(res), date: new Date(res.date) } : rec
      ),
    }));
  },

  addLeaveRequest: async (request) => {
    const res = await fetchJson('/api/leave-requests', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(request)),
    });
    set((state) => ({
      leaveRequests: [
        ...state.leaveRequests,
        {
          ...keysToCamel(res),
          startDate: new Date(res.start_date),
          endDate: new Date(res.end_date),
          submittedAt: new Date(res.submitted_at || res.created_at),
        },
      ],
    }));
  },

  updateLeaveRequest: async (id, status) => {
    const res = await fetchJson(`/api/leave-requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    set((state) => ({
      leaveRequests: state.leaveRequests.map((req) =>
        req.id === String(id) ? { ...req, status: res.status } : req
      ),
    }));
  },

  addDeployment: async (deployment) => {
    const res = await fetchJson('/api/deployments', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(deployment)),
    });
    set((state) => ({
      deployments: [
        ...state.deployments,
        {
          ...keysToCamel(res),
          startDate: new Date(res.start_date),
          endDate: new Date(res.end_date),
        },
      ],
    }));
  },

  updateDeployment: async (id, updates) => {
    const res = await fetchJson(`/api/deployments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(keysToSnake(updates)),
    });
    set((state) => ({
      deployments: state.deployments.map((dep) =>
        dep.id === String(id)
          ? {
              ...keysToCamel(res),
              startDate: new Date(res.start_date),
              endDate: new Date(res.end_date),
            }
          : dep
      ),
    }));
  },

  addTrainingProgram: async (program) => {
    const res = await fetchJson('/api/training-programs', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(program)),
    });
    set((state) => ({
      trainingPrograms: [
        ...state.trainingPrograms,
        {
          ...keysToCamel(res),
          nextStartDate: res.next_start_date ? new Date(res.next_start_date) : new Date(),
        },
      ],
    }));
  },

  addTrainee: async (trainee) => {
    const res = await fetchJson('/api/trainees', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(trainee)),
    });
    set((state) => ({
      trainees: [
        ...state.trainees,
        {
          ...keysToCamel(res),
          enrolledDate: new Date(res.enrolled_date || res.created_at),
        },
      ],
    }));
  },

  updateTraineeProgress: async (id, progress) => {
    const res = await fetchJson(`/api/trainees/${id}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ progress }),
    });
    set((state) => ({
      trainees: state.trainees.map((t) =>
        t.id === String(id) ? { ...t, progress: res.progress } : t
      ),
    }));
  },

  markNotificationRead: async (id) => {
    const res = await fetchJson(`/api/notifications/${id}/read`, {
      method: 'PUT',
    });
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === String(id) ? { ...keysToCamel(res), createdAt: new Date(res.created_at) } : n
      ),
    }));
  },

  markAllNotificationsRead: async () => {
    await fetchJson('/api/notifications/mark-all-read', {
      method: 'POST',
    });
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  addNotification: async (notification) => {
    const res = await fetchJson('/api/notifications', {
      method: 'POST',
      body: JSON.stringify(keysToSnake(notification)),
    });
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...keysToCamel(res), createdAt: new Date(res.created_at) },
      ],
    }));
  },

  fetchAppData: async () => {
    try {
      const [
        serviceRequests,
        clients,
        guards,
        attendance,
        leaveRequests,
        deployments,
        trainingPrograms,
        trainees,
        notifications,
      ] = await Promise.all([
        fetchJson('/api/service-requests').catch(() => []),
        fetchJson('/api/clients').catch(() => []),
        fetchJson('/api/guards').catch(() => []),
        fetchJson('/api/attendance').catch(() => []),
        fetchJson('/api/leave-requests').catch(() => []),
        fetchJson('/api/deployments').catch(() => []),
        fetchJson('/api/training-programs').catch(() => []),
        fetchJson('/api/trainees').catch(() => []),
        fetchJson('/api/notifications').catch(() => []),
      ]);

      set({
        serviceRequests: (serviceRequests || []).map((req: any) => ({
          ...keysToCamel(req),
          id: String(req.id),
          submittedAt: new Date(req.submitted_at || req.created_at),
        })),
        clients: (clients || []).map(parseClient).map((c: Client) => ({ ...c, id: String(c.id) })),
        guards: (guards || []).map((g: any) => ({
          ...keysToCamel(g),
          id: String(g.id),
          certifications: Array.isArray(g.certifications)
            ? g.certifications
            : typeof g.certifications === 'string'
            ? JSON.parse(g.certifications)
            : [],
        })),
        attendance: (attendance || []).map((a: any) => ({
          ...keysToCamel(a),
          id: String(a.id),
          guardId: String(a.guard_id),
          date: new Date(a.date),
        })),
        leaveRequests: (leaveRequests || []).map((l: any) => ({
          ...keysToCamel(l),
          id: String(l.id),
          guardId: String(l.guard_id),
          startDate: new Date(l.start_date),
          endDate: new Date(l.end_date),
          submittedAt: new Date(l.submitted_at || l.created_at),
        })),
        deployments: (deployments || []).map((d: any) => ({
          ...keysToCamel(d),
          id: String(d.id),
          guardId: String(d.guard_id),
          clientId: String(d.client_id),
          startDate: new Date(d.start_date),
          endDate: new Date(d.end_date),
        })),
        trainingPrograms: (trainingPrograms || []).map((t: any) => ({
          ...keysToCamel(t),
          id: String(t.id),
          nextStartDate: t.next_start_date ? new Date(t.next_start_date) : new Date(),
        })),
        trainees: (trainees || []).map((tr: any) => ({
          ...keysToCamel(tr),
          id: String(tr.id),
          programId: String(tr.program_id),
          enrolledDate: new Date(tr.enrolled_date || tr.created_at),
        })),
        notifications: (notifications || []).map((n: any) => ({
          ...keysToCamel(n),
          id: String(n.id),
          createdAt: new Date(n.created_at),
        })),
      });
    } catch (error) {
      console.error('Failed to fetch App Data:', error);
    }
  },
}));
