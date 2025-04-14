
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDashboard } from '../ui/badge-dashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'resolve' | 'approve' | 'comment';
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  const getActivityBadge = (type: Activity['type']) => {
    switch (type) {
      case 'create':
        return <BadgeDashboard variant="info">Created</BadgeDashboard>;
      case 'update':
        return <BadgeDashboard variant="secondary">Updated</BadgeDashboard>;
      case 'delete':
        return <BadgeDashboard variant="destructive">Deleted</BadgeDashboard>;
      case 'resolve':
        return <BadgeDashboard variant="success">Resolved</BadgeDashboard>;
      case 'approve':
        return <BadgeDashboard variant="success">Approved</BadgeDashboard>;
      case 'comment':
        return <BadgeDashboard variant="outline">Commented</BadgeDashboard>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activities</CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{activity.user.name}</span>
                  {getActivityBadge(activity.type)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.action} <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
