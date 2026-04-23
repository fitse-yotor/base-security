import { Outlet, Link, useLocation } from 'react-router';
import {
  LayoutDashboard, Users, UserCheck, Calendar, GraduationCap, BarChart3,
  Menu, X, LogOut, Bell, ClipboardCheck, Star, FileText,
  Home, Info, Shield, Image, BookOpen, HelpCircle, Briefcase, Phone, Globe,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { BaseLogo } from '../../components/BaseLogo';
import { useState } from 'react';
import { useAppStore } from '../../lib/store';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [cmsOpen, setCmsOpen] = useState(false);
  const location = useLocation();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navigation = [
    { name: 'Service Requests', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Clients', href: '/admin/clients', icon: Users },
    { name: 'Guards', href: '/admin/guards', icon: UserCheck },
    { name: 'Deployments', href: '/admin/deployments', icon: Calendar },
    { name: 'Training', href: '/admin/training', icon: GraduationCap },
    { name: 'Attendance', href: '/admin/attendance', icon: ClipboardCheck },
    { name: 'Payroll', href: '/admin/payroll', icon: FileText },
    { name: 'Invoices', href: '/admin/invoices', icon: FileText },
    { name: 'Feedback', href: '/admin/feedback', icon: Star },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
  ];

  const cmsNavigation = [
    { name: 'Homepage', href: '/admin/cms/home', icon: Home },
    { name: 'About Us', href: '/admin/cms/about', icon: Info },
    { name: 'Services', href: '/admin/cms/services', icon: Shield },
    { name: 'Gallery', href: '/admin/cms/gallery', icon: Image },
    { name: 'Blog & News', href: '/admin/cms/blog', icon: BookOpen },
    { name: 'FAQ', href: '/admin/cms/faq', icon: HelpCircle },
    { name: 'Careers', href: '/admin/cms/careers', icon: Briefcase },
    { name: 'Contact Info', href: '/admin/cms/contact', icon: Phone },
  ];

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) return location.pathname === item.href;
    return location.pathname.startsWith(item.href);
  };

  const isCMSActive = cmsNavigation.some((item) => location.pathname.startsWith(item.href));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-secondary text-white sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <BaseLogo className="w-9 h-9 flex-shrink-0" />
              <div><div className="font-semibold text-sm">BASE SECURITY Admin</div><div className="text-xs text-gray-300">Management Dashboard</div></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="relative p-2 hover:text-primary transition-colors" onClick={() => setNotifOpen(!notifOpen)}>
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white text-foreground rounded-lg shadow-xl border z-50">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && <button className="text-xs text-primary hover:underline" onClick={() => markAllNotificationsRead()}>Mark all read</button>}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? <p className="text-center text-muted-foreground p-4">No notifications</p> : notifications.slice(0, 10).map((notif) => (
                      <div key={notif.id} className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-primary/5' : ''}`} onClick={() => { markNotificationRead(notif.id); setNotifOpen(false); }}>
                        <div className="flex items-start gap-2">
                          {!notif.read && <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />}
                          <div className={!notif.read ? '' : 'ml-4'}>
                            <div className="font-semibold text-sm">{notif.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{notif.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">{new Date(notif.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="hidden md:block text-sm text-right"><div className="font-semibold">Admin User</div><div className="text-xs text-gray-300">System Administrator</div></div>
            <Link to="/"><Button variant="ghost" size="sm" className="text-white hover:text-primary"><LogOut className="w-4 h-4 mr-2" />Exit Admin</Button></Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r transition-transform duration-200 ease-in-out overflow-y-auto`}>
          <nav className="p-4 space-y-1 mt-16 lg:mt-0">
            {/* Operations */}
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-4 py-2">Operations</div>
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link key={item.name} to={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <Icon className="w-5 h-5" /><span>{item.name}</span>
                </Link>
              );
            })}

            {/* CMS Section */}
            <div className="pt-4">
              <button onClick={() => setCmsOpen(!cmsOpen)} className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${isCMSActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}>
                <div className="flex items-center gap-3"><Globe className="w-5 h-5" /><span className="font-semibold text-xs uppercase tracking-wider">Website CMS</span></div>
                <span className="text-xs">{cmsOpen ? 'â–²' : 'â–¼'}</span>
              </button>
              {(cmsOpen || isCMSActive) && (
                <div className="ml-4 mt-1 space-y-1">
                  {cmsNavigation.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item);
                    return (
                      <Link key={item.name} to={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${active ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <Icon className="w-4 h-4" /><span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-4 lg:p-8 min-w-0"><Outlet /></main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      {notifOpen && <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />}
    </div>
  );
}
