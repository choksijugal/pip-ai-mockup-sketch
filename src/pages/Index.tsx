
import React from 'react';
import { StatCard } from '@/components/dashboard/stat-card';
import { TaskProgress } from '@/components/dashboard/task-progress';
import { SystemIntegrations } from '@/components/dashboard/system-integrations';
import { ReconciliationStatus } from '@/components/dashboard/reconciliation-status';
import { RecentActivities } from '@/components/dashboard/recent-activities';
import { AIInsights } from '@/components/dashboard/ai-insights';
import { AIAssistantWidget } from '@/components/dashboard/ai-assistant-widget';
import { Clock, AlertCircle, CheckCircle, Banknote } from 'lucide-react';

const Index = () => {
  // Sample data for the dashboard
  const tasks = [
    {
      id: '1',
      title: 'Bank Reconciliation',
      status: 'in-progress' as const,
      dueDate: 'Today, 5:00 PM',
      assignee: 'Sarah Johnson',
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Review Expense Accruals',
      status: 'upcoming' as const,
      dueDate: 'Tomorrow, 12:00 PM',
      assignee: 'Sarah Johnson',
      priority: 'medium' as const,
    },
    {
      id: '3',
      title: 'Finalize Revenue Recognition',
      status: 'blocked' as const,
      dueDate: 'May 29, 3:00 PM',
      assignee: 'Sarah Johnson',
      priority: 'high' as const,
    },
    {
      id: '4',
      title: 'Approve Journal Entries',
      status: 'completed' as const,
      dueDate: 'May 28, 4:00 PM',
      assignee: 'Sarah Johnson',
      priority: 'low' as const,
    },
    {
      id: '5',
      title: 'Validate AR/AP Balances',
      status: 'completed' as const,
      dueDate: 'May 27, 2:00 PM',
      assignee: 'Sarah Johnson',
      priority: 'medium' as const,
    },
  ];

  const integrations = [
    {
      id: '1',
      name: 'NetSuite ERP',
      logo: '/placeholder.svg',
      status: 'connected' as const,
      lastSync: '10 minutes ago',
    },
    {
      id: '2',
      name: 'Stripe Billing',
      logo: '/placeholder.svg',
      status: 'connected' as const,
      lastSync: '25 minutes ago',
    },
    {
      id: '3',
      name: 'Salesforce CRM',
      logo: '/placeholder.svg',
      status: 'error' as const,
      lastSync: '2 hours ago',
    },
    {
      id: '4',
      name: 'ADP Payroll',
      logo: '/placeholder.svg',
      status: 'pending' as const,
      lastSync: 'Never',
    },
  ];

  const reconciliationData = [
    { name: 'Matched', value: 42, color: '#22c55e', status: 'matched' as const },
    { name: 'In Progress', value: 18, color: '#3b82f6', status: 'in-progress' as const },
    { name: 'Variance', value: 7, color: '#ef4444', status: 'variance' as const },
    { name: 'Not Started', value: 12, color: '#9ca3af', status: 'not-started' as const },
  ];

  const activities = [
    {
      id: '1',
      user: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        initials: 'MC',
      },
      action: 'resolved a variance in',
      target: 'Bank Reconciliation',
      timestamp: '10 minutes ago',
      type: 'resolve' as const,
    },
    {
      id: '2',
      user: {
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        initials: 'ER',
      },
      action: 'approved',
      target: 'May Expense Report',
      timestamp: '45 minutes ago',
      type: 'approve' as const,
    },
    {
      id: '3',
      user: {
        name: 'AI Assistant',
        initials: 'AI',
      },
      action: 'detected a discrepancy in',
      target: 'Revenue Recognition',
      timestamp: '1 hour ago',
      type: 'create' as const,
    },
    {
      id: '4',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        initials: 'SJ',
      },
      action: 'commented on',
      target: 'Q2 Forecast',
      timestamp: '2 hours ago',
      type: 'comment' as const,
    },
  ];

  const insights = [
    {
      id: '1',
      title: 'Revenue Recognition Anomaly',
      description: 'I detected an unusual pattern in the SaaS revenue recognition. There appears to be $24,500 that should be deferred to next quarter.',
      type: 'alert' as const,
      actionUrl: '#',
    },
    {
      id: '2',
      title: 'Expense Categorization',
      description: 'Based on my analysis, 12 recent cloud infrastructure expenses totaling $8,700 are miscategorized as general IT expenses.',
      type: 'suggestion' as const,
      actionUrl: '#',
    },
    {
      id: '3',
      title: 'Cash Flow Forecast',
      description: 'Based on current AR aging and historical payment patterns, I predict a 15% improvement in Days Sales Outstanding next month.',
      type: 'prediction' as const,
      actionUrl: '#',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Closing Deadline"
          value="3 Days"
          icon={Clock}
          tooltip="Time remaining until month-end close deadline"
          change={{ value: "On Schedule", type: "neutral" }}
          className="border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Open Issues"
          value="7"
          icon={AlertCircle}
          tooltip="Critical issues requiring attention"
          change={{ value: "-2 from last close", type: "increase" }}
          className="border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Completed Tasks"
          value="42/79"
          icon={CheckCircle}
          tooltip="Tasks completed out of total tasks"
          change={{ value: "53% Complete", type: "increase" }}
          className="border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Revenue Recognized"
          value="$4.2M"
          icon={Banknote}
          tooltip="Total revenue recognized this period"
          change={{ value: "+12% YoY", type: "increase" }}
          className="border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <div className="md:col-span-3 space-y-6">
          <TaskProgress tasks={tasks} totalTasks={15} />
          <SystemIntegrations integrations={integrations} />
        </div>
        <div className="md:col-span-3 space-y-6">
          <ReconciliationStatus 
            data={reconciliationData} 
            period="May 2025" 
          />
          <AIInsights insights={insights} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <div className="md:col-span-3 space-y-6">
          <RecentActivities activities={activities} />
        </div>
        <div className="md:col-span-3 space-y-6">
          <AIAssistantWidget />
        </div>
      </div>
    </div>
  );
};

export default Index;
