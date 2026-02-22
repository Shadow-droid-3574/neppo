
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between h-20 px-8 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
      <h2 className="text-3xl font-bold text-gray-100">{title}</h2>
      <div>
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://picsum.photos/100"
          alt="User avatar"
        />
      </div>
    </header>
  );
};

export default Header;
