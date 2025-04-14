
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDashboard } from '../ui/badge-dashboard';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export type TaskStatus = 'completed' | 'in-progress' | 'blocked' | 'upcoming';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
}

interface TaskProgressProps {
  tasks: Task[];
  totalTasks: number;
}

export function TaskProgress({ tasks, totalTasks }: TaskProgressProps) {
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const blockedTasks = tasks.filter(task => task.status === 'blocked').length;
  const percentComplete = Math.round((completedTasks / totalTasks) * 100);

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <BadgeDashboard variant="success">Completed</BadgeDashboard>;
      case 'in-progress':
        return <BadgeDashboard variant="info">In Progress</BadgeDashboard>;
      case 'blocked':
        return <BadgeDashboard variant="destructive">Blocked</BadgeDashboard>;
      case 'upcoming':
        return <BadgeDashboard variant="warning">Upcoming</BadgeDashboard>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>High Priority</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'medium':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Medium Priority</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'low':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Low Priority</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Month-End Closing Tasks</CardTitle>
            <CardDescription>May 2025</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span>Progress</span>
                {blockedTasks > 0 && (
                  <BadgeDashboard variant="destructive" className="text-xs">
                    {blockedTasks} Blocked
                  </BadgeDashboard>
                )}
              </div>
              <span className="font-medium">{completedTasks} of {totalTasks} tasks</span>
            </div>
            <Progress value={percentComplete} className="h-2" />
          </div>
          
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getPriorityBadge(task.priority)}
                  <span className="text-sm font-medium">{task.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block">
                    {getStatusBadge(task.status)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-xs">{completedTasks} Done</span>
              </div>
              {blockedTasks > 0 && (
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-xs">{blockedTasks} Blocked</span>
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm">Schedule Meeting</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
