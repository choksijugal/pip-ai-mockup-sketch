
import React from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Filter, Search, Download, Plus, ArrowUpDown } from 'lucide-react';

const Transactions = () => {
  const transactions = [
    {
      id: 'TX001',
      date: 'May 29, 2025',
      description: 'Software Subscription - Salesforce',
      category: 'Software Expense',
      amount: '$2,450.00',
      status: 'Posted',
    },
    {
      id: 'TX002',
      date: 'May 28, 2025',
      description: 'Office Supplies - Staples',
      category: 'Office Expense',
      amount: '$345.75',
      status: 'Posted',
    },
    {
      id: 'TX003',
      date: 'May 28, 2025',
      description: 'Customer Payment - Acme Corp',
      category: 'Accounts Receivable',
      amount: '$12,500.00',
      status: 'Pending',
    },
    {
      id: 'TX004',
      date: 'May 27, 2025',
      description: 'AWS Cloud Services',
      category: 'IT Infrastructure',
      amount: '$4,320.50',
      status: 'Posted',
    },
    {
      id: 'TX005',
      date: 'May 26, 2025',
      description: 'Employee Reimbursement - Travel',
      category: 'Travel Expense',
      amount: '$875.20',
      status: 'Pending Approval',
    },
  ];

  return (
    <AppLayout title="Transactions">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="w-full bg-background pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            View and manage financial transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium flex items-center gap-1">
                    Date <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium flex items-center gap-1">
                    Amount <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell className={
                    transaction.status === 'Pending' || transaction.status === 'Pending Approval' 
                      ? 'text-amber-600'
                      : transaction.status === 'Posted' 
                        ? 'text-green-600' 
                        : ''
                  }>
                    {transaction.status}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
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

export default Transactions;
