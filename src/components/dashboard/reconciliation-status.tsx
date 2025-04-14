
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDashboard } from '../ui/badge-dashboard';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface ReconciliationItem {
  name: string;
  value: number;
  color: string;
  status: 'matched' | 'in-progress' | 'variance' | 'not-started';
}

interface ReconciliationStatusProps {
  data: ReconciliationItem[];
  period: string;
}

export function ReconciliationStatus({ data, period }: ReconciliationStatusProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const getStatusBadge = (status: ReconciliationItem['status']) => {
    switch (status) {
      case 'matched':
        return <BadgeDashboard variant="success">Matched</BadgeDashboard>;
      case 'in-progress':
        return <BadgeDashboard variant="info">In Progress</BadgeDashboard>;
      case 'variance':
        return <BadgeDashboard variant="destructive">Variance</BadgeDashboard>;
      case 'not-started':
        return <BadgeDashboard variant="secondary">Not Started</BadgeDashboard>;
      default:
        return null;
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Reconciliation Status</CardTitle>
            <div className="text-sm text-muted-foreground">{period}</div>
          </div>
          <Button variant="outline" size="sm" className="bg-white">View Details</Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: number) => [`${value} accounts`, null]}
                  labelFormatter={() => ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2 flex flex-col justify-center">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.value}</span>
                  <div className="hidden sm:block">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-2 border-t mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-sm font-medium">{total} accounts</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
