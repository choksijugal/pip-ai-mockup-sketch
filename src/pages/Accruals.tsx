
import React from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter, Clock, CheckCircle, AlertCircle, ArrowUpDown } from 'lucide-react';

const Accruals = () => {
  const accruals = [
    {
      id: 'ACR001',
      description: 'SaaS Subscription Revenue',
      amount: '$235,450.00',
      period: 'May 2025',
      status: 'Approved',
      type: 'Revenue',
    },
    {
      id: 'ACR002',
      description: 'AWS Infrastructure Costs',
      amount: '$42,320.75',
      period: 'May 2025',
      status: 'Pending Review',
      type: 'Expense',
    },
    {
      id: 'ACR003',
      description: 'Employee Bonuses',
      amount: '$75,000.00',
      period: 'May 2025',
      status: 'Needs Attention',
      type: 'Expense',
    },
    {
      id: 'ACR004',
      description: 'Marketing Campaign Services',
      amount: '$28,450.00',
      period: 'May 2025',
      status: 'Approved',
      type: 'Expense',
    },
    {
      id: 'ACR005',
      description: 'Professional Services Revenue',
      amount: '$118,750.00',
      period: 'May 2025',
      status: 'Pending Review',
      type: 'Revenue',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Approved</Badge>;
      case 'Pending Review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1"><Clock className="h-3 w-3" /> Pending Review</Badge>;
      case 'Needs Attention':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Needs Attention</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AppLayout title="Accruals">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Accrual
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Period Accruals</CardTitle>
          <CardDescription>
            Revenue and expense accruals for May 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium flex items-center gap-1">
                    Amount <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accruals.map((accrual) => (
                <TableRow key={accrual.id}>
                  <TableCell className="font-medium">{accrual.description}</TableCell>
                  <TableCell>{accrual.amount}</TableCell>
                  <TableCell>{accrual.period}</TableCell>
                  <TableCell>
                    <Badge variant={accrual.type === 'Revenue' ? 'default' : 'secondary'}>
                      {accrual.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(accrual.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Accruals;
