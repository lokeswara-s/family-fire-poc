import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Flame, Users2, User, LineChart, Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center space-x-2">
              <Flame className="h-8 w-8 text-orange-500" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FamilyFIRE</h1>
            </NavLink>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <NavLink to="/" end className={navLinkClass}>
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/individual-goals" className={navLinkClass}>
                <User className="h-5 w-5" />
                <span>Individual Goals</span>
              </NavLink>
              <NavLink to="/family-goals" className={navLinkClass}>
                <Users2 className="h-5 w-5" />
                <span>Family Goals</span>
              </NavLink>
              <NavLink to="/investments" className={navLinkClass}>
                <LineChart className="h-5 w-5" />
                <span>Investments</span>
              </NavLink>
            </nav>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2">
              <NavLink 
                to="/" 
                end 
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Dashboard</span>
              </NavLink>
              <NavLink 
                to="/individual-goals" 
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Individual Goals</span>
              </NavLink>
              <NavLink 
                to="/family-goals" 
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <Users2 className="h-5 w-5" />
                <span>Family Goals</span>
              </NavLink>
              <NavLink 
                to="/investments" 
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <LineChart className="h-5 w-5" />
                <span>Investments</span>
              </NavLink>
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;