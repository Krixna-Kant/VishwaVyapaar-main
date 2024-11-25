import React from "react";
import { Home, BarChart2, FileText, Settings, User, LogOut } from 'lucide-react';
import { 
  SignInButton, 
  SignUpButton,
  useUser,
  useClerk
} from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', icon: Home },
    { name: 'Analytics', icon: BarChart2 },
    { name: 'Reports', icon: FileText },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-[var(--glass-border)] px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Navigation Links */}
        <div className="flex space-x-1">
          {navItems.map((item) => (
            <button 
              key={item.name}
              className="flex items-center space-x-2 px-4 py-2 rounded-md
                text-[var(--primary-400)]
                hover:text-[var(--primary-600)]
                hover:bg-[var(--primary-50)]
                transition-colors duration-200
                text-sm font-medium"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium 
                  text-[var(--primary-500)]
                  hover:text-[var(--primary-600)] 
                  transition-colors">
                  Sign In
                </button>
              </SignInButton>
              
              <SignUpButton mode="modal">
                <button className="px-6 py-2 rounded-md 
                  bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-coral)]
                  text-white text-sm font-medium
                  hover:opacity-90 transition-opacity">
                  Get Started
                </button>
              </SignUpButton>
            </>
          ) : (
            <>
              {/* Profile Section */}
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-3 px-3 py-2 rounded-md
                  hover:bg-[var(--primary-50)] transition-colors"
              >
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-[var(--primary-100)]"
                />
                <span className="text-sm font-medium text-[var(--primary-600)]">
                  {user.firstName || user.username}
                </span>
              </button>

              {/* Sign Out Button */}
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 px-4 py-2 rounded-md
                  text-red-600 hover:bg-red-50 transition-colors
                  text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
