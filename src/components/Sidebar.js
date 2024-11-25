import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe, 
  Gift, 
  MessageSquareMore, 
  BarChart2,
  GraduationCap 
} from 'lucide-react';

const Globe3D = () => {
  return (
    <div className="globe-container relative w-10 h-10">

      <div className="globe absolute w-full h-full rounded-full">
   
        {[...Array(8)].map((_, i) => (
          <div
            key={`meridian-${i}`}
            className="meridian absolute w-full h-full rounded-full border"
            style={{
              borderColor: 'var(--color-coral)',
              opacity: 0.3,
              transform: `rotateY(${i * 22.5}deg)`
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`parallel-${i}`}
            className="parallel absolute w-full h-[2px]"
            style={{
              background: 'var(--color-coral)',
              opacity: 0.3,
              top: `${20 + i * 12}%`
            }}
          />
        ))}
        

        <div className="continents absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={`continent-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: 'var(--color-coral)',
                left: `${30 + Math.random() * 40}%`,
                top: `${20 + Math.random() * 60}%`,
                opacity: 0.6 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 rounded-full blur-sm"
           style={{ background: 'var(--color-coral)', opacity: 0.1 }} />

      <div className="absolute inset-0 rounded-full"
           style={{ background: 'linear-gradient(to right, var(--color-coral), transparent)', opacity: 0.2 }} />
    </div>
  );
};

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const menuItems = [
    { 
      icon: <LayoutDashboard size={24} />, 
      text: 'Dashboard', 
      path: '/' 
    },
    { 
      icon: <Globe size={24} />, 
      text: 'Global Market', 
      path: '/global-market' 
    },
    { 
      icon: <MessageSquareMore size={24} />, 
      text: 'AI Assistant', 
      path: '/assistant' 
    },
    { 
      icon: <GraduationCap size={24} />, 
      text: 'Learning Hub', 
      path: '/learning-hub' 
    },
    { 
      icon: <BarChart2 size={24} />, 
      text: 'Analytics', 
      path: '/analytics' 
    },
    { 
      icon: <Gift size={24} />, 
      text: 'Incentive', 
      path: '/incentive' 
    }
  ];

  return (
    <div className="w-72 min-h-screen glass-card sidebar border-r border-[var(--glass-border)] px-4 py-6 flex flex-col">

      <div className="mb-10">
        <Link to="/" className="flex items-center gap-3 mb-2 px-2">
          <h1 className="text-2xl font-bold gradient-text font-heading tracking-tight">
            VishwaVyapaar
          </h1>
          <Globe3D />
        </Link>
        <p className="text-[var(--primary-600)] text-sm italic px-2 font-body">
          Where Local Meets Global
        </p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                          font-body font-medium hover:scale-102 ${
                  location.pathname === item.path 
                    ? 'gradient-bg text-white shadow-lg' 
                    : 'text-[var(--primary-600)] hover:bg-[var(--primary-50)]'
                }`}
              >
                <span className={location.pathname === item.path ? 'text-white' : 'text-[var(--primary-500)]'}>
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 p-4 rounded-xl font-body" style={{ background: 'var(--primary-50)' }}>
        <h3 className="font-heading font-semibold text-[var(--primary-600)] mb-2">
          Export Progress
        </h3>
        <div className="w-full h-2 bg-[var(--primary-100)] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500 gradient-bg" style={{ width: '65%' }} />
        </div>
        <p className="text-sm text-[var(--primary-500)] mt-2">65% Profile Complete</p>
      </div>
    </div>
  );
};

export default Sidebar;