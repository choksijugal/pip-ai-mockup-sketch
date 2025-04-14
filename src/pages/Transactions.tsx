
import React from 'react';
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
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="w-full bg-white pl-8 border-gray-200"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-white shadow-sm border-gray-200">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-white shadow-sm border-gray-200">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-primary shadow-sm">
            <Plus className="h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border border-gray-200 shadow-sm">
        <CardHeader className="pb-0 border-b bg-gray-50">
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            View and manage financial transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 bg-white p-0">
          <Table>
            <TableHeader className="bg-gray-50">
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
                <TableRow key={transaction.id} className="hover:bg-gray-50">
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
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Transactions;
