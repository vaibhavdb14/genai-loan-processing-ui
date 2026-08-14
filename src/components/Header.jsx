import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-banking-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center bg-banking-background rounded-md px-3 py-1.5 border border-border-light w-96">
        <Search size={16} className="text-text-muted mr-2" />
        <input 
          type="text" 
          placeholder="Search applications (e.g., APP-2026-001024)..." 
          className="bg-transparent border-none focus:outline-none text-sm w-full text-text-primary placeholder-text-muted"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-text-secondary hover:text-banking-primary transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-banking-warning w-2.5 h-2.5 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-border-light pl-4 ml-2">
          <div className="w-8 h-8 bg-banking-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
            JM
          </div>
          <div className="text-sm">
            <p className="font-semibold text-text-primary">Jane Manager</p>
            <p className="text-xs text-text-muted">Underwriter</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;