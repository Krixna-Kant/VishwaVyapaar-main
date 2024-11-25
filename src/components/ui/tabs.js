import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type === TabsContent) {
          return activeTab === child.props.value ? child : null;
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-4 mb-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabsTrigger = ({ value, activeTab, setActiveTab, children }) => {
  const isActive = activeTab === value;
  return (
    <button
      className={`px-4 py-2 rounded-lg ${
        isActive
          ? 'bg-blue-500 text-white font-bold'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children }) => {
  return <div className="p-4 bg-white rounded-lg shadow">{children}</div>;
};
