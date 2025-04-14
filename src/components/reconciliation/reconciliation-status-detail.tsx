
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDashboard } from '@/components/ui/badge-dashboard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface ReconciliationStatusDetailProps {
  data: {
    name: string;
    value: number;
    color: string;
    status: 'matched' | 'in-progress' | 'variance' | 'not-started';
  }[];
  totalBankAmount: number;
  totalGLAmount: number;
  variance: number;
  accountName: string;
  lastUpdated: string;
}

export function ReconciliationStatusDetail({ 
  data, 
  totalBankAmount, 
  totalGLAmount, 
  variance,
  accountName,
  lastUpdated
}: ReconciliationStatusDetailProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const getStatusBadge = (status: 'matched' | 'in-progress' | 'variance' | 'not-started') => {
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

  // Format currency with $ sign and 2 decimal places
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="border border-gray-200 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b bg-gray-50">
        <CardTitle>{accountName} Reconciliation Status</CardTitle>
        <div className="text-sm text-muted-foreground">Last updated: {lastUpdated}</div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid sm:grid-cols-2 gap-6">
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
                  formatter={(value: number) => [`${value} transactions`, null]}
                  labelFormatter={() => ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            {/* Transaction statistics */}
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Transaction Status</h4>
              <div className="space-y-2">
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
                    <span className="text-sm font-medium">{total} transactions</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Balance information */}
            <div className="space-y-1 pt-3 border-t">
              <h4 className="text-sm font-medium">Balance Information</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bank Balance</span>
                  <span className="text-sm font-medium">{formatCurrency(totalBankAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">GL Balance</span>
                  <span className="text-sm font-medium">{formatCurrency(totalGLAmount)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Variance</span>
                  <span className={`text-sm font-medium ${variance !== 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(variance)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
