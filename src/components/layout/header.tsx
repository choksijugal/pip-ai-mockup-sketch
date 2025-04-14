
import React from 'react';
import { Bell, MessageSquare, Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const navigate = useNavigate();

  const handleProfileClick = (action: string) => {
    switch(action) {
      case 'profile':
        navigate('/settings');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'help':
        navigate('/help');
        break;
      case 'logout':
        toast.info('You have been logged out', {
          description: 'In a real app, this would log you out.',
        });
        break;
      default:
        break;
    }
  };

  const handleNotificationClick = () => {
    toast.success('Notification viewed', {
      description: 'You can now view and manage your notifications.',
    });
  };

  const handleMessageClick = () => {
    toast.info('Messages', {
      description: 'Your message center would open here.',
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const searchInput = target.elements.namedItem('search') as HTMLInputElement;
    if (searchInput?.value) {
      toast.info('Search results', {
        description: `Searching for "${searchInput.value}"`,
      });
      searchInput.value = '';
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center gap-2 font-semibold text-lg md:text-xl mr-4">
          <span className="text-primary font-bold">Pip</span>
          <span>CloseOps</span>
        </div>
        <form onSubmit={handleSearch} className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              name="search"
              placeholder="Search..."
              className="w-64 pl-8 rounded-lg bg-background"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={handleMessageClick}>
            <MessageSquare className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleNotificationClick}>
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Task Due: Complete Bank Reconciliation</div>
                  <div className="text-xs text-muted-foreground">Due in 2 hours</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleNotificationClick}>
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Variance Detected: Accounts Payable</div>
                  <div className="text-xs text-muted-foreground">AI detected a $5,320 discrepancy</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleNotificationClick}>
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Missing Document: Invoice #1082</div>
                  <div className="text-xs text-muted-foreground">Required for month-end close</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center font-medium" onClick={handleNotificationClick}>
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sarah Johnson</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileClick('profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleProfileClick('settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleProfileClick('help')}>Help</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileClick('logout')}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </form>
      </div>
    </header>
  );
}
