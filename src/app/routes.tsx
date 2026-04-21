import { createBrowserRouter } from 'react-router';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import PrivateSecurityPage from './pages/services/PrivateSecurityPage';
import GuardTrainingPage from './pages/services/GuardTrainingPage';
import OfficeBuildingPage from './pages/services/OfficeBuildingPage';
import HousekeepingPage from './pages/services/HousekeepingPage';
import TrainingSection from './pages/TrainingSection';
import AboutUs from './pages/AboutUs';
import ContactPage from './pages/ContactPage';
import RequestServicePage from './pages/RequestServicePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClientManagement from './pages/admin/ClientManagement';
import GuardManagement from './pages/admin/GuardManagement';
import DeploymentManagement from './pages/admin/DeploymentManagement';
import TrainingManagement from './pages/admin/TrainingManagement';
import ServiceRequests from './pages/admin/ServiceRequests';
import Reports from './pages/admin/Reports';
import AttendanceManagement from './pages/admin/AttendanceManagement';
import PayrollManagement from './pages/admin/PayrollManagement';
import FeedbackManagement from './pages/admin/FeedbackManagement';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'services/private-security', Component: PrivateSecurityPage },
      { path: 'services/guard-training', Component: GuardTrainingPage },
      { path: 'services/office-building', Component: OfficeBuildingPage },
      { path: 'services/housekeeping', Component: HousekeepingPage },
      { path: 'training', Component: TrainingSection },
      { path: 'about', Component: AboutUs },
      { path: 'contact', Component: ContactPage },
      { path: 'request-service', Component: RequestServicePage },
      {
        path: 'admin',
        Component: AdminDashboard,
        children: [
          { index: true, Component: ServiceRequests },
          { path: 'clients', Component: ClientManagement },
          { path: 'guards', Component: GuardManagement },
          { path: 'deployments', Component: DeploymentManagement },
          { path: 'training', Component: TrainingManagement },
          { path: 'attendance', Component: AttendanceManagement },
          { path: 'payroll', Component: PayrollManagement },
          { path: 'feedback', Component: FeedbackManagement },
          { path: 'reports', Component: Reports },
        ],
      },
      { path: '*', Component: NotFound },
    ],
  },
]);
