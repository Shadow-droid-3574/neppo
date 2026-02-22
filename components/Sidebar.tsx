
import React from 'react';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-indigo-400">Bot AI</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => setActiveView(item.name)}
                className={`flex items-center w-full py-3 px-4 rounded-lg transition-colors duration-200 ${
                  activeView === item.name
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {React.cloneElement(item.icon, { className: 'h-6 w-6 mr-4' })}
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-500">
        <p>&copy; 2024 Telegram AI Bot</p>
        <p>Powered by Gemini</p>
      </div>
    </div>
  );
};

export default Sidebar;
