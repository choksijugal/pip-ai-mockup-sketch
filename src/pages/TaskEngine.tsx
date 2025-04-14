
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BadgeDashboard } from '@/components/ui/badge-dashboard';
import { 
  Plus, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight, 
  User, 
  FileCheck2, 
  MessageSquare, 
  Upload, 
  FileSpreadsheet,
  CheckSquare,
  UploadCloud,
  Eye,
  RefreshCw,
  Search,
  ChevronsUpDown,
  Bot,
  Mail,
  CalendarDays
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';

// Task type definitions
type TaskStatus = 'not-started' | 'in-progress' | 'completed' | 'blocked' | 'waiting';
type TaskType = 'prepare' | 'review' | 'approve' | 'reconcile' | 'upload';

interface Task {
  id: string;
  name: string;
  description: string;
  category: string;
  status: TaskStatus;
  dueDate: string;
  dayOffset: number;
  owner: {
    name: string;
    initials: string;
  };
  taskType: TaskType;
  lastUpdated?: string;
  latestComment?: string;
  attachedFiles?: number;
  blockedReason?: string;
}

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: "1",
    name: "Bank Reconciliation - Operating Account",
    description: "Reconcile the operating bank account with GL balance",
    category: "Cash & Bank",
    status: "in-progress",
    dueDate: "Today, 5:00 PM",
    dayOffset: 2,
    owner: {
      name: "Alex Johnson",
      initials: "AJ"
    },
    taskType: "reconcile",
    lastUpdated: "2 hours ago",
    latestComment: "Found three unrecorded transactions, investigating now",
    attachedFiles: 2
  },
  {
    id: "2",
    name: "Review Expense Accruals",
    description: "Review and approve all expense accruals for the month",
    category: "Accruals",
    status: "not-started",
    dueDate: "Tomorrow, 12:00 PM",
    dayOffset: 3,
    owner: {
      name: "Taylor Smith",
      initials: "TS"
    },
    taskType: "review",
    lastUpdated: "1 day ago"
  },
  {
    id: "3",
    name: "Finalize Revenue Recognition",
    description: "Complete revenue recognition calculations and prepare journal entries",
    category: "Revenue Recognition",
    status: "blocked",
    dueDate: "May 30, 3:00 PM",
    dayOffset: 4,
    owner: {
      name: "Jordan Lee",
      initials: "JL"
    },
    taskType: "prepare",
    blockedReason: "Missing data from sales team",
    lastUpdated: "3 days ago"
  },
  {
    id: "4",
    name: "Approve Journal Entries",
    description: "Review and approve all month-end journal entries",
    category: "Accruals",
    status: "completed",
    dueDate: "May 28, 4:00 PM",
    dayOffset: 2,
    owner: {
      name: "Morgan Rivera",
      initials: "MR"
    },
    taskType: "approve",
    lastUpdated: "4 days ago",
    latestComment: "All entries reviewed and approved"
  },
  {
    id: "5",
    name: "AR Aging Analysis",
    description: "Review AR aging and calculate bad debt provisions",
    category: "Accounts Receivable",
    status: "in-progress",
    dueDate: "Today, 3:00 PM",
    dayOffset: 2,
    owner: {
      name: "Riley Chen",
      initials: "RC"
    },
    taskType: "prepare",
    lastUpdated: "1 hour ago"
  },
  {
    id: "6",
    name: "Upload Vendor Statements",
    description: "Upload all vendor statements for AP reconciliation",
    category: "Accounts Payable",
    status: "waiting",
    dueDate: "Tomorrow, 10:00 AM",
    dayOffset: 3,
    owner: {
      name: "Casey Williams",
      initials: "CW"
    },
    taskType: "upload",
    lastUpdated: "5 hours ago",
    latestComment: "Waiting for statements from top 5 vendors"
  },
  {
    id: "7",
    name: "Payroll Reconciliation",
    description: "Reconcile payroll accounts and expenses",
    category: "Payroll",
    status: "not-started",
    dueDate: "May 31, 12:00 PM",
    dayOffset: 5,
    owner: {
      name: "Quinn Foster",
      initials: "QF"
    },
    taskType: "reconcile"
  },
  {
    id: "8",
    name: "Fixed Asset Additions",
    description: "Process fixed asset additions and calculate depreciation",
    category: "Inventory & Fixed Assets",
    status: "not-started",
    dueDate: "May 31, 5:00 PM",
    dayOffset: 5,
    owner: {
      name: "Jamie Wong",
      initials: "JW"
    },
    taskType: "prepare"
  },
  {
    id: "9",
    name: "Intercompany Reconciliation",
    description: "Reconcile all intercompany accounts and transactions",
    category: "Intercompany",
    status: "waiting",
    dueDate: "May 30, 4:00 PM",
    dayOffset: 4,
    owner: {
      name: "Drew Martin",
      initials: "DM"
    },
    taskType: "reconcile",
    lastUpdated: "2 days ago",
    latestComment: "Waiting for confirmation from subsidiary"
  }
];

// Group tasks by category
const getTasksByCategory = () => {
  const categories: {[key: string]: Task[]} = {};
  
  mockTasks.forEach(task => {
    if (!categories[task.category]) {
      categories[task.category] = [];
    }
    categories[task.category].push(task);
  });
  
  return categories;
};

// Get task counts by status
const getTaskCounts = () => {
  const counts = {
    total: mockTasks.length,
    completed: mockTasks.filter(t => t.status === 'completed').length,
    overdue: mockTasks.filter(t => t.dueDate.includes('Today') && t.status !== 'completed').length,
    blocked: mockTasks.filter(t => t.status === 'blocked' || t.status === 'waiting').length,
  };
  
  return counts;
};

// Get status color and icon
const getStatusInfo = (status: TaskStatus) => {
  switch (status) {
    case 'completed':
      return { 
        icon: CheckCircle2, 
        bgColor: 'bg-green-50', 
        textColor: 'text-green-500',
        label: 'Completed'
      };
    case 'in-progress':
      return { 
        icon: Clock, 
        bgColor: 'bg-amber-50', 
        textColor: 'text-amber-500',
        label: 'In Progress'
      };
    case 'blocked':
      return { 
        icon: AlertCircle, 
        bgColor: 'bg-red-50', 
        textColor: 'text-red-500',
        label: 'Blocked'
      };
    case 'waiting':
      return { 
        icon: Clock, 
        bgColor: 'bg-blue-50', 
        textColor: 'text-blue-500',
        label: 'Waiting for Input'
      };
    default:
      return { 
        icon: Clock, 
        bgColor: 'bg-gray-50', 
        textColor: 'text-gray-500',
        label: 'Not Started'
      };
  }
};

// Get task type icon
const getTaskTypeIcon = (taskType: TaskType) => {
  switch (taskType) {
    case 'prepare':
      return FileSpreadsheet;
    case 'review':
      return Eye;
    case 'approve':
      return CheckSquare;
    case 'reconcile':
      return RefreshCw;
    case 'upload':
      return UploadCloud;
    default:
      return FileCheck2;
  }
};

const TaskEngine = () => {
  const [activeDay, setActiveDay] = useState('all');
  const [activeView, setActiveView] = useState('list');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Cash & Bank', 'Accounts Receivable']);

  // Filter tasks based on selected day
  const filterTasksByDay = (tasks: Task[]) => {
    if (activeDay === 'all') return tasks;
    const dayNumber = parseInt(activeDay.replace('day', ''));
    return tasks.filter(task => task.dayOffset === dayNumber);
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  // Open task details drawer
  const openTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const taskCounts = getTaskCounts();
  const tasksByCategory = getTasksByCategory();

  // To fix the syntax error with dynamic icons, we'll render these separately
  const renderStatusIcon = (status: TaskStatus) => {
    const StatusIcon = getStatusInfo(status).icon;
    return <StatusIcon className={`h-3 w-3 ${getStatusInfo(status).textColor}`} />;
  };

  const renderTaskTypeIcon = (taskType: TaskType) => {
    const TaskTypeIcon = getTaskTypeIcon(taskType);
    return <TaskTypeIcon className="h-4 w-4 text-gray-600" />;
  };

  return (
    <>
      {/* Header metrics panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                <h3 className="text-2xl font-semibold">{taskCounts.total}</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <FileCheck2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <h3 className="text-2xl font-semibold">{taskCounts.completed}</h3>
              </div>
              <div className="bg-green-50 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <h3 className="text-2xl font-semibold">{taskCounts.overdue}</h3>
              </div>
              <div className="bg-red-50 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Blocked</p>
                <h3 className="text-2xl font-semibold">{taskCounts.blocked}</h3>
              </div>
              <div className="bg-amber-50 p-2 rounded-full">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Task controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 bg-white shadow-sm border-gray-200 h-10">
            <Filter className="h-4 w-4 text-gray-500" />
            Filter
          </Button>
          <Button 
            variant="outline" 
            className={`gap-2 shadow-sm border-gray-200 h-10 ${activeView === 'list' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white'}`}
            onClick={() => setActiveView('list')}
          >
            <FileCheck2 className="h-4 w-4" />
            List View
          </Button>
          <Button 
            variant="outline" 
            className={`gap-2 shadow-sm border-gray-200 h-10 ${activeView === 'calendar' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white'}`}
            onClick={() => setActiveView('calendar')}
          >
            <Calendar className="h-4 w-4" />
            Calendar View
          </Button>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="h-10 w-full rounded-md border border-gray-200 bg-white pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <Button className="gap-2 bg-[#111827] hover:bg-[#1f2937] shadow-md h-10">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </div>
      
      {/* Close timeline header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Month-End Close Timeline</h3>
          <div className="flex items-center gap-2">
            <BadgeDashboard variant="info" className="text-xs">
              Current Day: 2
            </BadgeDashboard>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              <span className="text-xs">May 2025</span>
            </Button>
          </div>
        </div>
        <div className="flex">
          <Button 
            variant="ghost" 
            className={`flex-1 rounded-none border-b-2 ${activeDay === 'all' ? 'border-primary text-primary' : 'border-transparent'}`}
            onClick={() => setActiveDay('all')}
          >
            All Days
          </Button>
          {[1, 2, 3, 4, 5].map(day => (
            <Button 
              key={day}
              variant="ghost" 
              className={`flex-1 rounded-none border-b-2 ${activeDay === `day${day}` ? 'border-primary text-primary' : 'border-transparent'} ${day === 2 ? 'bg-blue-50' : ''}`}
              onClick={() => setActiveDay(`day${day}`)}
            >
              Day {day}
              {day === 2 && (
                <span className="ml-1 px-1.5 py-0.5 bg-blue-100 rounded-full text-xs text-blue-700">Today</span>
              )}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Task categories and items */}
      <div className="space-y-4">
        <Accordion type="multiple" defaultValue={expandedCategories} className="space-y-4">
          {Object.entries(tasksByCategory).map(([category, tasks]) => (
            <AccordionItem 
              key={category} 
              value={category}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{category}</span>
                  <BadgeDashboard variant="secondary" className="text-xs font-normal">
                    {tasks.length} tasks
                  </BadgeDashboard>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-0 pb-2">
                <div className="divide-y divide-gray-100">
                  {filterTasksByDay(tasks).map(task => {
                    const statusInfo = getStatusInfo(task.status);
                    const TaskTypeIcon = getTaskTypeIcon(task.taskType);
                    
                    return (
                      <div 
                        key={task.id} 
                        className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => openTaskDetails(task)}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusInfo.bgColor} flex-shrink-0`}>
                              {React.createElement(statusInfo.icon, { className: `h-5 w-5 ${statusInfo.textColor}` })}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="font-medium text-gray-900">{task.name}</div>
                                <div className="bg-gray-100 p-1 rounded">
                                  {React.createElement(TaskTypeIcon, { className: "h-3.5 w-3.5 text-gray-500" })}
                                </div>
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                <span className={task.dueDate.includes('Today') && task.status !== 'completed' ? 'text-red-500 font-medium' : ''}>
                                  {task.dueDate}
                                </span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">
                                    {task.owner.initials}
                                  </div>
                                  <span>{task.owner.name}</span>
                                </div>
                                {task.blockedReason && (
                                  <>
                                    <span>•</span>
                                    <span className="text-red-500">{task.blockedReason}</span>
                                  </>
                                )}
                              </div>
                              {task.latestComment && (
                                <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
                                  <span className="font-medium">Latest update:</span> {task.latestComment}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MessageSquare className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Upload className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Bot className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      {/* Task details drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-w-3xl mx-auto">
          <DrawerHeader>
            <DrawerTitle>{selectedTask?.name}</DrawerTitle>
            <DrawerDescription>{selectedTask?.description}</DrawerDescription>
          </DrawerHeader>
          {selectedTask && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusInfo(selectedTask.status).bgColor}`}>
                      {renderStatusIcon(selectedTask.status)}
                    </div>
                    <span className="font-medium">{getStatusInfo(selectedTask.status).label}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Owner</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                      {selectedTask.owner.initials}
                    </div>
                    <span className="font-medium">{selectedTask.owner.name}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">{selectedTask.dueDate}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Task Type</p>
                  <div className="flex items-center gap-2">
                    {renderTaskTypeIcon(selectedTask.taskType)}
                    <p className="font-medium capitalize">{selectedTask.taskType}</p>
                  </div>
                </div>
              </div>
              
              {/* Quick actions */}
              <div className="pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="gap-1">
                    <ArrowRight className="h-3.5 w-3.5" />
                    Start Task
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Upload className="h-3.5 w-3.5" />
                    Upload Files
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Bot className="h-3.5 w-3.5" />
                    Ask AI
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    Send to Team
                  </Button>
                </div>
              </div>
              
              {/* Activity and comments section */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Activity & Comments</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium flex-shrink-0">
                      AJ
                    </div>
                    <div className="rounded-lg border border-gray-200 px-4 py-3 bg-white w-full">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">Alex Johnson</span>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm mt-1">Found three unrecorded transactions, investigating now</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium flex-shrink-0">
                      TS
                    </div>
                    <div className="rounded-lg border border-gray-200 px-4 py-3 bg-white w-full">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">Taylor Smith</span>
                        <span className="text-xs text-gray-500">1 day ago</span>
                      </div>
                      <p className="text-sm mt-1">Added transaction data from the bank statement</p>
                      <div className="mt-2 p-2 rounded bg-gray-50 border border-gray-100 text-xs text-gray-500">
                        File attached: bank_statement_may.pdf
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Add comment input */}
                <div className="flex gap-3 mt-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0">
                    ME
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <div className="flex justify-between mt-2">
                      <Button size="sm" variant="outline" className="gap-1 h-8">
                        <Upload className="h-3.5 w-3.5" />
                        Attach
                      </Button>
                      <Button size="sm" className="gap-1 h-8">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DrawerClose className="absolute right-4 top-4">
            <Button variant="outline" size="sm">
              Close
            </Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TaskEngine;
