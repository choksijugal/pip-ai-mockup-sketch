
import React, { useState } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarProvider 
} from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { Header } from './header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <SidebarProvider defaultOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex min-h-screen w-full">
        <Sidebar className={sidebarOpen ? 'w-64' : 'w-16'}>
          <SidebarHeader className="p-4 flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center gap-2 font-semibold text-base">
                <span className="text-primary font-bold">Pip</span>
                <span>CloseOps</span>
              </div>
            ) : (
              <div className="mx-auto font-bold text-primary">P</div>
            )}
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav collapsed={!sidebarOpen} />
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto bg-muted/20 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
