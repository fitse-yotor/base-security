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
  addServiceRequest: (request: Omit<ServiceRequest, 'id' | 'submittedAt'>) => void;
  updateServiceRequestStatus: (id: string, status: ServiceRequest['status']) => void;
  convertRequestToClient: (requestId: string) => void;

  // Clients
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  addClientNote: (clientId: string, text: string) => void;
  addClientFeedback: (clientId: string, feedback: Omit<ClientFeedback, 'id' | 'submittedAt'>) => void;

  // Guards
  guards: Guard[];
  addGuard: (guard: Omit<Guard, 'id'>) => void;
  updateGuard: (id: string, updates: Partial<Guard>) => void;

  // Attendance
  attendance: AttendanceRecord[];
  addAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  updateAttendance: (id: string, updates: Partial<AttendanceRecord>) => void;

  // Leave Requests
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'submittedAt'>) => void;
  updateLeaveRequest: (id: string, status: LeaveRequest['status']) => void;

  // Deployments
  deployments: Deployment[];
  addDeployment: (deployment: Omit<Deployment, 'id'>) => void;
  updateDeployment: (id: string, updates: Partial<Deployment>) => void;

  // Training Programs
  trainingPrograms: TrainingProgram[];
  addTrainingProgram: (program: Omit<TrainingProgram, 'id'>) => void;

  // Trainees
  trainees: Trainee[];
  addTrainee: (trainee: Omit<Trainee, 'id'>) => void;
  updateTraineeProgress: (id: string, progress: number) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

// Mock data
const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    name: 'Abebe Girma',
    phone: '+251 91 234 5678',
    email: 'abebe.girma@company.com',
    serviceType: 'Office & Building Security',
    location: 'Bole, Addis Abeba',
    numberOfGuards: 3,
    duration: '6 months',
    specialRequirements: 'Need guards with experience in corporate environments',
    status: 'pending',
    submittedAt: new Date('2026-04-20'),
  },
  {
    id: '2',
    name: 'Tigist Haile',
    phone: '+251 91 345 6789',
    email: 'tigist.h@vipevents.com',
    serviceType: 'Private Security (VIP)',
    location: 'Sheraton Addis, Addis Abeba',
    numberOfGuards: 5,
    duration: '2 weeks',
    specialRequirements: 'VIP protection for international delegation',
    status: 'approved',
    submittedAt: new Date('2026-04-18'),
  },
];

const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'Dawit Bekele',
    email: 'security@ethiotelecom.com',
    phone: '+251 91 456 7890',
    company: 'Ethio Telecom',
    serviceType: 'Office & Building Security',
    location: 'Churchill Avenue, Addis Abeba',
    contractStart: new Date('2026-01-15'),
    contractEnd: new Date('2026-07-15'),
    monthlyRate: 45000,
    status: 'active',
    assignedGuards: ['g1', 'g2'],
    lastContactDate: new Date('2026-04-10'),
    nextFollowUp: new Date('2026-05-10'),
    notes: [
      { id: 'n1', text: 'Client requested additional guard for night shift', createdAt: new Date('2026-04-10') },
    ],
    feedback: [
      { id: 'f1', rating: 5, comment: 'Excellent service, very professional guards.', submittedAt: new Date('2026-03-15') },
    ],
  },
  {
    id: 'c2',
    name: 'Meron Tadesse',
    email: 'operations@hiltonaddis.com',
    phone: '+251 91 567 8901',
    company: 'Hilton Addis Abeba',
    serviceType: 'Private Security (VIP)',
    location: 'Menelik II Ave, Addis Abeba',
    contractStart: new Date('2026-02-01'),
    contractEnd: new Date('2026-08-01'),
    monthlyRate: 85000,
    status: 'active',
    assignedGuards: ['g3', 'g4', 'g5'],
    lastContactDate: new Date('2026-04-15'),
    nextFollowUp: new Date('2026-05-15'),
    notes: [],
    feedback: [
      { id: 'f2', rating: 4, comment: 'Good service overall, response time could be improved.', submittedAt: new Date('2026-04-01') },
    ],
  },
];

const mockGuards: Guard[] = [
  {
    id: 'g1',
    name: 'Yonas Tesfaye',
    employeeId: 'BASE-001',
    phone: '+251 91 111 2222',
    email: 'yonas.t@basesecurity.com',
    trainingLevel: 'Advanced',
    experience: '8 years',
    availability: 'deployed',
    certifications: ['CPR', 'First Aid', 'Security Management'],
    assignedTo: 'c1',
    monthlySalary: 8500,
    performanceRating: 4.5,
    leaveBalance: 12,
  },
  {
    id: 'g2',
    name: 'Hiwot Alemu',
    employeeId: 'BASE-002',
    phone: '+251 91 222 3333',
    email: 'hiwot.a@basesecurity.com',
    trainingLevel: 'Advanced',
    experience: '6 years',
    availability: 'deployed',
    certifications: ['CPR', 'First Aid', 'Access Control'],
    assignedTo: 'c1',
    monthlySalary: 7500,
    performanceRating: 4.2,
    leaveBalance: 10,
  },
  {
    id: 'g3',
    name: 'Biruk Mengistu',
    employeeId: 'BASE-003',
    phone: '+251 91 333 4444',
    email: 'biruk.m@basesecurity.com',
    trainingLevel: 'Expert',
    experience: '12 years',
    availability: 'deployed',
    certifications: ['VIP Protection', 'CPR', 'First Aid', 'Crisis Management'],
    assignedTo: 'c2',
    monthlySalary: 12000,
    performanceRating: 4.8,
    leaveBalance: 15,
  },
  {
    id: 'g4',
    name: 'Selam Worku',
    employeeId: 'BASE-004',
    phone: '+251 91 444 5555',
    email: 'selam.w@basesecurity.com',
    trainingLevel: 'Intermediate',
    experience: '4 years',
    availability: 'available',
    certifications: ['CPR', 'First Aid'],
    monthlySalary: 6000,
    performanceRating: 3.9,
    leaveBalance: 8,
  },
  {
    id: 'g5',
    name: 'Robel Hailu',
    employeeId: 'BASE-005',
    phone: '+251 91 555 6666',
    email: 'robel.h@basesecurity.com',
    trainingLevel: 'Advanced',
    experience: '7 years',
    availability: 'deployed',
    certifications: ['CPR', 'First Aid', 'Security Systems'],
    assignedTo: 'c2',
    monthlySalary: 9000,
    performanceRating: 4.3,
    leaveBalance: 11,
  },
];

const mockDeployments: Deployment[] = [
  {
    id: 'd1',
    guardId: 'g1',
    clientId: 'c1',
    location: 'Churchill Avenue, Addis Abeba',
    shift: 'day',
    startDate: new Date('2026-04-15'),
    endDate: new Date('2026-05-15'),
    status: 'active',
    performanceRating: 4.5,
  },
  {
    id: 'd2',
    guardId: 'g2',
    clientId: 'c1',
    location: 'Churchill Avenue, Addis Abeba',
    shift: 'night',
    startDate: new Date('2026-04-15'),
    endDate: new Date('2026-05-15'),
    status: 'active',
  },
];

const mockTrainingPrograms: TrainingProgram[] = [
  {
    id: 't1',
    name: 'Basic Security Guard Training',
    duration: '2 weeks',
    requirements: ['High school diploma', 'Background check'],
    description: 'Comprehensive training covering basic security principles, observation, reporting, and emergency response.',
    nextStartDate: new Date('2026-05-01'),
    enrolledTrainees: ['tr1', 'tr2'],
  },
  {
    id: 't2',
    name: 'VIP Protection Specialist',
    duration: '4 weeks',
    requirements: ['2+ years security experience', 'Basic training certificate'],
    description: 'Advanced training in executive protection, threat assessment, and personal security.',
    nextStartDate: new Date('2026-05-15'),
    enrolledTrainees: ['tr3'],
  },
];

const mockTrainees: Trainee[] = [
  {
    id: 'tr1',
    name: 'Kaleb Desta',
    email: 'kaleb.d@email.com',
    phone: '+251 91 777 8888',
    programId: 't1',
    progress: 45,
    status: 'in-progress',
    enrolledDate: new Date('2026-04-01'),
  },
  {
    id: 'tr2',
    name: 'Liya Bekele',
    email: 'liya.b@email.com',
    phone: '+251 91 888 9999',
    programId: 't1',
    progress: 60,
    status: 'in-progress',
    enrolledDate: new Date('2026-04-01'),
  },
  {
    id: 'tr3',
    name: 'Natnael Girma',
    email: 'natnael.g@email.com',
    phone: '+251 91 999 0000',
    programId: 't2',
    progress: 25,
    status: 'in-progress',
    enrolledDate: new Date('2026-04-10'),
  },
];

const mockAttendance: AttendanceRecord[] = [
  { id: 'a1', guardId: 'g1', date: new Date('2026-04-21'), checkIn: '06:50', checkOut: '19:05', status: 'present' },
  { id: 'a2', guardId: 'g2', date: new Date('2026-04-21'), checkIn: '18:55', checkOut: undefined, status: 'present' },
  { id: 'a3', guardId: 'g3', date: new Date('2026-04-21'), checkIn: '07:15', checkOut: '19:10', status: 'late', notes: 'Traffic delay' },
  { id: 'a4', guardId: 'g4', date: new Date('2026-04-21'), status: 'absent' },
  { id: 'a5', guardId: 'g5', date: new Date('2026-04-21'), checkIn: '18:50', checkOut: undefined, status: 'present' },
];

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'l1',
    guardId: 'g4',
    startDate: new Date('2026-04-22'),
    endDate: new Date('2026-04-24'),
    reason: 'Family emergency',
    status: 'pending',
    submittedAt: new Date('2026-04-21'),
  },
];

const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'pending_request',
    title: 'New Service Request',
    message: 'Abebe Girma submitted a new service request for Office Security.',
    read: false,
    createdAt: new Date('2026-04-20'),
    linkTo: '/admin',
  },
  {
    id: 'notif2',
    type: 'contract_expiry',
    title: 'Contract Expiring Soon',
    message: 'Ethio Telecom contract expires on July 15, 2026. Consider renewal.',
    read: false,
    createdAt: new Date('2026-04-19'),
    linkTo: '/admin/clients',
  },
  {
    id: 'notif3',
    type: 'follow_up',
    title: 'Follow-up Due',
    message: 'Follow-up with Ethio Telecom is due on May 10, 2026.',
    read: false,
    createdAt: new Date('2026-04-18'),
    linkTo: '/admin/clients',
  },
  {
    id: 'notif4',
    type: 'leave_request',
    title: 'Leave Request Pending',
    message: 'Selam Worku has submitted a leave request for Apr 22–24.',
    read: false,
    createdAt: new Date('2026-04-21'),
    linkTo: '/admin/guards',
  },
  {
    id: 'notif5',
    type: 'absent_guard',
    title: 'Guard Absent Today',
    message: 'Selam Worku (BASE-004) is marked absent today.',
    read: true,
    createdAt: new Date('2026-04-21'),
    linkTo: '/admin/attendance',
  },
];

export const useAppStore = create<AppStore>((set) => ({
  // Service Requests
  serviceRequests: mockServiceRequests,
  addServiceRequest: (request) =>
    set((state) => ({
      serviceRequests: [
        ...state.serviceRequests,
        { ...request, id: `req-${Date.now()}`, submittedAt: new Date() },
      ],
      notifications: [
        ...state.notifications,
        {
          id: `notif-${Date.now()}`,
          type: 'pending_request' as const,
          title: 'New Service Request',
          message: `${request.name} submitted a new service request for ${request.serviceType}.`,
          read: false,
          createdAt: new Date(),
          linkTo: '/admin',
        },
      ],
    })),
  updateServiceRequestStatus: (id, status) =>
    set((state) => ({
      serviceRequests: state.serviceRequests.map((req) =>
        req.id === id ? { ...req, status } : req
      ),
    })),
  convertRequestToClient: (requestId) =>
    set((state) => {
      const request = state.serviceRequests.find((r) => r.id === requestId);
      if (!request) return state;
      const newClient: Client = {
        id: `c-${Date.now()}`,
        name: request.name,
        email: request.email,
        phone: request.phone,
        company: request.name,
        serviceType: request.serviceType,
        location: request.location,
        contractStart: new Date(),
        status: 'active',
        assignedGuards: [],
        notes: [],
        feedback: [],
      };
      return {
        serviceRequests: state.serviceRequests.map((req) =>
          req.id === requestId ? { ...req, status: 'converted' as const } : req
        ),
        clients: [...state.clients, newClient],
      };
    }),

  // Clients
  clients: mockClients,
  addClient: (client) =>
    set((state) => ({
      clients: [...state.clients, { ...client, id: `c-${Date.now()}` }],
    })),
  updateClient: (id, updates) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...updates } : client
      ),
    })),
  addClientNote: (clientId, text) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              notes: [
                ...client.notes,
                { id: `note-${Date.now()}`, text, createdAt: new Date() },
              ],
            }
          : client
      ),
    })),
  addClientFeedback: (clientId, feedback) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              feedback: [
                ...client.feedback,
                { ...feedback, id: `fb-${Date.now()}`, submittedAt: new Date() },
              ],
            }
          : client
      ),
    })),

  // Guards
  guards: mockGuards,
  addGuard: (guard) =>
    set((state) => ({
      guards: [...state.guards, { ...guard, id: `g-${Date.now()}` }],
    })),
  updateGuard: (id, updates) =>
    set((state) => ({
      guards: state.guards.map((guard) =>
        guard.id === id ? { ...guard, ...updates } : guard
      ),
    })),

  // Attendance
  attendance: mockAttendance,
  addAttendance: (record) =>
    set((state) => ({
      attendance: [...state.attendance, { ...record, id: `a-${Date.now()}` }],
    })),
  updateAttendance: (id, updates) =>
    set((state) => ({
      attendance: state.attendance.map((rec) =>
        rec.id === id ? { ...rec, ...updates } : rec
      ),
    })),

  // Leave Requests
  leaveRequests: mockLeaveRequests,
  addLeaveRequest: (request) =>
    set((state) => ({
      leaveRequests: [
        ...state.leaveRequests,
        { ...request, id: `l-${Date.now()}`, submittedAt: new Date() },
      ],
      notifications: [
        ...state.notifications,
        {
          id: `notif-${Date.now()}`,
          type: 'leave_request' as const,
          title: 'New Leave Request',
          message: `A guard has submitted a leave request.`,
          read: false,
          createdAt: new Date(),
          linkTo: '/admin/guards',
        },
      ],
    })),
  updateLeaveRequest: (id, status) =>
    set((state) => ({
      leaveRequests: state.leaveRequests.map((req) =>
        req.id === id ? { ...req, status } : req
      ),
    })),

  // Deployments
  deployments: mockDeployments,
  addDeployment: (deployment) =>
    set((state) => ({
      deployments: [...state.deployments, { ...deployment, id: `d-${Date.now()}` }],
    })),
  updateDeployment: (id, updates) =>
    set((state) => ({
      deployments: state.deployments.map((dep) =>
        dep.id === id ? { ...dep, ...updates } : dep
      ),
    })),

  // Training Programs
  trainingPrograms: mockTrainingPrograms,
  addTrainingProgram: (program) =>
    set((state) => ({
      trainingPrograms: [...state.trainingPrograms, { ...program, id: `t-${Date.now()}` }],
    })),

  // Trainees
  trainees: mockTrainees,
  addTrainee: (trainee) =>
    set((state) => ({
      trainees: [...state.trainees, { ...trainee, id: `tr-${Date.now()}` }],
    })),
  updateTraineeProgress: (id, progress) =>
    set((state) => ({
      trainees: state.trainees.map((trainee) =>
        trainee.id === id ? { ...trainee, progress } : trainee
      ),
    })),

  // Notifications
  notifications: mockNotifications,
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: `notif-${Date.now()}`, createdAt: new Date() },
      ],
    })),
}));
