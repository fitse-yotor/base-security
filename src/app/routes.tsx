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
import RequestTrackingPage from './pages/RequestTrackingPage';
import GalleryPage from './pages/GalleryPage';
import FAQPage from './pages/FAQPage';
import CertificationsPage from './pages/CertificationsPage';
import BlogPage from './pages/BlogPage';
import ClientPortalPage from './pages/ClientPortalPage';
import InvoicePage from './pages/InvoicePage';
import CareersPage from './pages/CareersPage';
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
      // Services
      { path: 'services/private-security', Component: PrivateSecurityPage },
      { path: 'services/guard-training', Component: GuardTrainingPage },
      { path: 'services/office-building', Component: OfficeBuildingPage },
      { path: 'services/housekeeping', Component: HousekeepingPage },
      // Public pages
      { path: 'training', Component: TrainingSection },
      { path: 'about', Component: AboutUs },
      { path: 'contact', Component: ContactPage },
      { path: 'request-service', Component: RequestServicePage },
      // New features
      { path: 'track-request', Component: RequestTrackingPage },
      { path: 'gallery', Component: GalleryPage },
      { path: 'faq', Component: FAQPage },
      { path: 'certifications', Component: CertificationsPage },
      { path: 'blog', Component: BlogPage },
      { path: 'client-portal', Component: ClientPortalPage },
      { path: 'invoice', Component: InvoicePage },
      { path: 'careers', Component: CareersPage },
      // Admin
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
          { path: 'invoices', Component: InvoicePage },
        ],
      },
      { path: '*', Component: NotFound },
    ],
  },
]);
