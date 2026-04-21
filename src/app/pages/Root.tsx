import { Outlet, Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BaseLogo } from '../components/BaseLogo';
import { useState } from 'react';

export default function Root() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-secondary text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <BaseLogo className="w-14 h-14 flex-shrink-0" />
              <div>
                <div className="text-lg font-bold leading-tight">BASE SECURITY</div>
                <div className="text-xs font-medium" style={{ color: '#F5C842' }}>
                  CLEANING & TRADING PLC
                </div>
                <div className="text-xs text-gray-300">ቤዝ ለላቀ የደህንነት አገልግሎት</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <div className="relative group">
                <button className="hover:text-primary transition-colors">Services</button>
                <div className="absolute top-full left-0 mt-2 bg-white text-foreground rounded-lg shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[240px] z-50">
                  <Link
                    to="/services/private-security"
                    className="block px-4 py-2 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                  >
                    Private Security (VIP)
                  </Link>
                  <Link
                    to="/services/guard-training"
                    className="block px-4 py-2 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                  >
                    Guard Training Programs
                  </Link>
                  <Link
                    to="/services/office-building"
                    className="block px-4 py-2 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                  >
                    Office & Building Security
                  </Link>
                  <Link
                    to="/services/housekeeping"
                    className="block px-4 py-2 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                  >
                    Housekeeping & Cleaning
                  </Link>
                </div>
              </div>
              <Link to="/training" className="hover:text-primary transition-colors">
                Training
              </Link>
              <Link to="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/admin">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Admin Login
                </Button>
              </Link>
              <Link to="/request-service">
                <Button className="bg-primary hover:bg-primary/90 text-white">Request Service</Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/20">
              <nav className="flex flex-col gap-4">
                <Link to="/" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <div className="pl-4 flex flex-col gap-2">
                  <div className="text-sm text-gray-400">Services:</div>
                  <Link to="/services/private-security" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Private Security (VIP)
                  </Link>
                  <Link to="/services/guard-training" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Guard Training Programs
                  </Link>
                  <Link to="/services/office-building" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Office & Building Security
                  </Link>
                  <Link to="/services/housekeeping" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Housekeeping & Cleaning
                  </Link>
                </div>
                <Link to="/training" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Training
                </Link>
                <Link to="/about" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  About Us
                </Link>
                <Link to="/contact" className="hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-primary text-primary">
                    Admin Login
                  </Button>
                </Link>
                <Link to="/request-service" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Request Service</Button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BaseLogo className="w-12 h-12 flex-shrink-0" />
                <div>
                  <div className="font-bold text-sm">BASE SECURITY</div>
                  <div className="text-xs" style={{ color: '#F5C842' }}>CLEANING & TRADING PLC</div>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                ቤዝ ለላቀ የደህንነት አገልግሎት
              </p>
              <p className="text-xs text-gray-400 mt-1">Base Excellence Security Service</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                <Link to="/training" className="hover:text-primary transition-colors">Training</Link>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Our Services</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/services/private-security" className="hover:text-primary transition-colors">Private Security</Link>
                <Link to="/services/guard-training" className="hover:text-primary transition-colors">Guard Training</Link>
                <Link to="/services/office-building" className="hover:text-primary transition-colors">Office Security</Link>
                <Link to="/services/housekeeping" className="hover:text-primary transition-colors">Housekeeping & Cleaning</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <p>Megenagna City Square Mall</p>
                <p>10th Floor, Addis Abeba</p>
                <p>Phone: +251 91 123 4038</p>
                <p>Email: basesc4@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 BASE SECURITY, CLEANING & TRADING PLC. All rights reserved.</p>
            <p className="mt-1">Megenagna City Square Mall, 10th Floor, Addis Abeba | basesc4@gmail.com | +251 91 123 4038</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
