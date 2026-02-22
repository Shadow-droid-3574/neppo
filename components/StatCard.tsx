
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon: React.ReactElement;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 flex items-center shadow-lg hover:shadow-indigo-500/20 transition-shadow duration-300">
      <div className="p-4 bg-indigo-500/20 rounded-lg mr-6">
        {React.cloneElement(icon, { className: 'h-8 w-8 text-indigo-400' })}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;