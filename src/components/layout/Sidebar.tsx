import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LayoutDashboard, MessageCircle, Settings, LogOut, Bot } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-border/60 flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <Bot className="w-8 h-8 text-primary" />
        <h1 className="text-xl font-bold">Vanna AI</h1>
      </div>
      <nav className="flex-1 px-4 py-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              isActive && 'bg-accent text-primary'
            )
          }
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            cn(
              'mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              isActive && 'bg-accent text-primary'
            )
          }
        >
          <MessageCircle className="h-4 w-4" />
          Chat with Data
        </NavLink>
      </nav>
      <div className="mt-auto p-4 border-t border-border/60">
         <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/40?u=a042581f4e29026704d" alt="User" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col">
                <span className="font-semibold text-sm">Olivia Martin</span>
                <span className="text-xs text-muted-foreground">olivia.martin@email.com</span>
            </div>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
