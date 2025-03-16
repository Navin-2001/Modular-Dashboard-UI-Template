import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Users,
  Package,
  UserSquare2,
  LayoutDashboard,
  Settings,
  HelpCircle,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Employees', href: '/employees', icon: UserSquare2 },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Library', href: '/library', icon: BookOpen },
];

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <span className="text-xl font-bold text-white">🎓 EduAdmin</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-3 py-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                    'group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200'
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-white',
                      'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="mt-10 pt-10 border-t border-gray-700">
            {secondaryNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:bg-gray-800 hover:text-white group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 mb-1"
              >
                <item.icon className="text-gray-400 group-hover:text-white mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}