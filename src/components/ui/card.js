import React from 'react';

// Card Component
export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  );
};

// CardHeader Component (Optional)
export const CardHeader = ({ children, className }) => {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// CardTitle Component (Optional)
export const CardTitle = ({ children, className }) => {
  return (
    <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
  );
};

// CardContent Component
export const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
