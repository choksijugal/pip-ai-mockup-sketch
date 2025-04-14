
import React from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Calendar, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const TaskEngine = () => {
  return (
    <AppLayout title="Task Engine">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-5">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="today" className="flex items-center gap-1">
            Today
            <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium">5</span>
          </TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="blocked" className="hidden md:flex">Blocked</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Monthly Close Tasks</CardTitle>
              <CardDescription>May 2025 close process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div>
                      <div className="font-semibold">Bank Reconciliation</div>
                      <div className="text-sm text-muted-foreground">Due Today, 5:00 PM</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Start Task</Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div>
                      <div className="font-semibold">Review Expense Accruals</div>
                      <div className="text-sm text-muted-foreground">Due Tomorrow, 12:00 PM</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Start Task</Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="font-semibold">Finalize Revenue Recognition</div>
                      <div className="text-sm text-muted-foreground">Blocked: Missing Data</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-semibold">Approve Journal Entries</div>
                      <div className="text-sm text-muted-foreground">Completed May 28, 4:00 PM</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="today" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>Tasks due today, May 29, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div>
                      <div className="font-semibold">Bank Reconciliation</div>
                      <div className="text-sm text-muted-foreground">Due Today, 5:00 PM</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Start Task</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks due in the future</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">Review Expense Accruals</div>
                      <div className="text-sm text-muted-foreground">Due Tomorrow, 12:00 PM</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Start Task</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>Recently completed tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-semibold">Approve Journal Entries</div>
                      <div className="text-sm text-muted-foreground">Completed May 28, 4:00 PM</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-semibold">Validate AR/AP Balances</div>
                      <div className="text-sm text-muted-foreground">Completed May 27, 2:00 PM</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blocked" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Blocked Tasks</CardTitle>
              <CardDescription>Tasks that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="font-semibold">Finalize Revenue Recognition</div>
                      <div className="text-sm text-muted-foreground">Blocked: Missing Data</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default TaskEngine;
