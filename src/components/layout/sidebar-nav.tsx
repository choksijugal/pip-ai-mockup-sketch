
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Workflow,
  FileCheck2,
  Bot,
  Settings,
  LifeBuoy,
  LogOut,
  Users,
  Home,
  ReceiptText,
  CircleDollarSign,
} from 'lucide-react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

export function SidebarNav({ className, collapsed = false, ...props }: SidebarNavProps) {
  const location = useLocation();
  
  const items = [
    {
      title: 'Dashboard',
      icon: Home,
      href: '/',
    },
    {
      title: 'Task Engine',
      icon: Workflow,
      href: '/task-engine',
    },
    {
      title: 'Reconciliations',
      icon: FileCheck2,
      href: '/reconciliations',
    },
    {
      title: 'AI Assistant',
      icon: Bot,
      href: '/assistant',
    },
    {
      title: 'Transactions',
      icon: ReceiptText,
      href: '/transactions',
    },
    {
      title: 'Financial Reports',
      icon: BarChart3,
      href: '/reports',
    },
    {
      title: 'Accruals',
      icon: CircleDollarSign,
      href: '/accruals',
    },
    {
      title: 'Team',
      icon: Users,
      href: '/team',
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];

  return (
    <nav className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/' && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative",
                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
              {isActive && !collapsed && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-sidebar-accent-foreground" />
              )}
            </Link>
          );
        })}
      </div>
      <div className="mt-auto">
        <Link
          to="/help"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground",
            location.pathname === "/help" ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""
          )}
        >
          <LifeBuoy className="h-5 w-5" />
          {!collapsed && <span>Help & Support</span>}
        </Link>
        <Link
          to="/logout"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Log out</span>}
        </Link>
      </div>
    </nav>
  );
}
