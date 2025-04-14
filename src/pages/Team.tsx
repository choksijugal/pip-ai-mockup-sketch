
import React from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, MailPlus, Users } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Finance Director',
      email: 'sarah.johnson@pipcloseops.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Active',
      initials: 'SJ',
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Senior Accountant',
      email: 'michael.chen@pipcloseops.com',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Active',
      initials: 'MC',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Financial Analyst',
      email: 'emily.rodriguez@pipcloseops.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Active',
      initials: 'ER',
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'Accounts Payable Specialist',
      email: 'david.kim@pipcloseops.com',
      avatar: '',
      status: 'Away',
      initials: 'DK',
    },
    {
      id: '5',
      name: 'Jessica Patel',
      role: 'Revenue Accountant',
      email: 'jessica.patel@pipcloseops.com',
      avatar: '',
      status: 'Active',
      initials: 'JP',
    },
  ];

  return (
    <AppLayout title="Team">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search team members..."
            className="w-full bg-background pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <MailPlus className="h-4 w-4" />
            Invite
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> Finance Team Members
          </CardTitle>
          <CardDescription>
            Manage your team members and their access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.name} />
                    ) : null}
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge 
                    variant="outline"
                    className={
                      member.status === 'Active' 
                        ? 'border-green-200 text-green-700 bg-green-50' 
                        : 'border-amber-200 text-amber-700 bg-amber-50'
                    }
                  >
                    {member.status}
                  </Badge>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Team;
