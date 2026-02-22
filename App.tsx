
import React, { useState } from 'react';
import { NAV_ITEMS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>(NAV_ITEMS[0].name);

  const ActiveComponent = NAV_ITEMS.find(item => item.name === activeView)?.component || (() => <div>Not Found</div>);
  
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={activeView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-8">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default App;
