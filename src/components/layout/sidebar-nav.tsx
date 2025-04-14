
import React from 'react';
import { Link } from 'react-router-dom';
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
  const items = [
    {
      title: 'Dashboard',
      icon: Home,
      href: '/',
      active: true,
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
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              item.active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </div>
      <div className="mt-auto">
        <Link
          to="/help"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
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
