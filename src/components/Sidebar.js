import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Globe, MessageSquareMore, BarChart2, GraduationCap, Gift, Menu } from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/' },
    { icon: <Globe size={20} />, text: 'Global Market', path: '/global-market' },
    { icon: <MessageSquareMore size={20} />, text: 'AI Assistant', path: '/assistant' },
    { icon: <GraduationCap size={20} />, text: 'Learning Hub', path: '/learning-hub' },
    { icon: <BarChart2 size={20} />, text: 'Analytics', path: '/analytics' },
    { icon: <Gift size={20} />, text: 'Incentive', path: '/incentive' },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-full p-2 shadow"
        onClick={() => setCollapsed((c) => !c)}
      >
        <Menu size={18} />
      </button>
      

      <aside
        className={`min-h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-72'
        }`}
      >
        <div className="flex items-center gap-3 mb-2 px-4 py-5">
          {!collapsed && (
            <>
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center animate-spin"
                style={{
                  backgroundImage:
                    'url("https://media.istockphoto.com/id/2166045540/photo/night-planet-earth-asian-countries-with-light-lines-of-communication-and-connection-business.jpg?s=1024x1024&w=is&k=20&c=zuqWYawhNNHDwRcqDONrcYCbv07s0NKKuQbqyQr-IoM=")',
                  animationDuration: '30s',
                }}
              />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-blue-600">VishwaVyapaar</h1>
                <span className="text-xs text-blue-400 italic">Where Local Meets Global</span>
              </div>
            </>
          )}
          {collapsed && (
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center animate-spin"
              style={{
                backgroundImage:
                  'url("https://media.istockphoto.com/id/2166045540/photo/night-planet-earth-asian-countries-with-light-lines-of-communication-and-connection-business.jpg?s=1024x1024&w=is&k=20&c=zuqWYawhNNHDwRcqDONrcYCbv07s0NKKuQbqyQr-IoM=")',
                animationDuration: '30s',
              }}
            />
          )}
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-6">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <span className={location.pathname === item.path ? 'text-white' : 'text-blue-500'}>
                    {item.icon}
                  </span>
                  {!collapsed && <span className="text-sm font-medium">{item.text}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {!collapsed && <div className="h-8" />}
      </aside>
    </>
  );
};

export default Sidebar;