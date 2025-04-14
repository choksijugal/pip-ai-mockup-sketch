
import React from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Calendar, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const TaskEngine = () => {
  return (
    <AppLayout title="Task Engine">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-white shadow-sm border-gray-200 h-10">
            <Filter className="h-4 w-4 text-gray-500" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-white shadow-sm border-gray-200 h-10">
            <Calendar className="h-4 w-4 text-gray-500" />
            View Calendar
          </Button>
        </div>
        <Button className="gap-2 bg-[#111827] hover:bg-[#1f2937] shadow-md h-10">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full flex bg-muted/30 p-1 rounded-lg mb-6">
          <TabsTrigger value="all" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            All Tasks
          </TabsTrigger>
          <TabsTrigger value="today" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-2">
            Today
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">5</span>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Completed
          </TabsTrigger>
          <TabsTrigger value="blocked" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Blocked
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-2 bg-white">
              <CardTitle className="text-xl">Monthly Close Tasks</CardTitle>
              <CardDescription>May 2025 close process</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50">
                      <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Bank Reconciliation</div>
                      <div className="text-sm text-gray-500">Due Today, 5:00 PM</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shadow-sm bg-white border-gray-200 hover:bg-gray-50">
                    Start Task
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50">
                      <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Review Expense Accruals</div>
                      <div className="text-sm text-gray-500">Due Tomorrow, 12:00 PM</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shadow-sm bg-white border-gray-200 hover:bg-gray-50">
                    Start Task
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Finalize Revenue Recognition</div>
                      <div className="text-sm text-gray-500">Blocked: Missing Data</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shadow-sm bg-white border-gray-200 hover:bg-gray-50">
                    View Details
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-50">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Approve Journal Entries</div>
                      <div className="text-sm text-gray-500">Completed May 28, 4:00 PM</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="today" className="mt-4">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-2 bg-white">
              <CardTitle className="text-xl">Today's Tasks</CardTitle>
              <CardDescription>Tasks due today, May 29, 2025</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50">
                      <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Bank Reconciliation</div>
                      <div className="text-sm text-gray-500">Due Today, 5:00 PM</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shadow-sm bg-white border-gray-200 hover:bg-gray-50">
                    Start Task
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-4">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-2 bg-white">
              <CardTitle className="text-xl">Upcoming Tasks</CardTitle>
              <CardDescription>Tasks due in the future</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Review Expense Accruals</div>
                      <div className="text-sm text-gray-500">Due Tomorrow, 12:00 PM</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shadow-sm bg-white border-gray-200 hover:bg-gray-50">
                    Start Task
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-2 bg-white">
              <CardTitle className="text-xl">Completed Tasks</CardTitle>
              <CardDescription>Recently completed tasks</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-50">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Approve Journal Entries</div>
                      <div className="text-sm text-gray-500">Completed May 28, 4:00 PM</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-50">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Validate AR/AP Balances</div>
                      <div className="text-sm text-gray-500">Completed May 27, 2:00 PM</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blocked" className="mt-4">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-2 bg-white">
              <CardTitle className="text-xl">Blocked Tasks</CardTitle>
              <CardDescription>Tasks that need attention</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Finalize Revenue Recognition</div>
                      <div className="text-sm text-gray-500">Blocked: Missing Data</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shadow-sm bg-white border-gray-200 hover:bg-gray-50">
                    View Details
                  </Button>
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
