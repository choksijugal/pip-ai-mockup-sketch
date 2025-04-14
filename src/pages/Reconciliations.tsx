
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, CheckCircle2, Clock, AlertCircle, PlusCircle, Filter } from 'lucide-react';

const Reconciliations = () => {
  const reconciliationItems = [
    {
      id: '1',
      account: 'Cash - Operating Account',
      bankBalance: '$342,518.75',
      glBalance: '$345,122.50',
      variance: '$2,603.75',
      status: 'in-progress',
      lastUpdated: '2 hours ago',
    },
    {
      id: '2',
      account: 'Accounts Receivable',
      bankBalance: '$128,450.00',
      glBalance: '$128,450.00',
      variance: '$0.00',
      status: 'matched',
      lastUpdated: '1 day ago',
    },
    {
      id: '3',
      account: 'Credit Card',
      bankBalance: '$12,845.32',
      glBalance: '$15,640.29',
      variance: '$2,794.97',
      status: 'variance',
      lastUpdated: '3 hours ago',
    },
    {
      id: '4',
      account: 'Payroll Account',
      bankBalance: '$56,320.00',
      glBalance: '$56,320.00',
      variance: '$0.00',
      status: 'matched',
      lastUpdated: '1 day ago',
    },
    {
      id: '5',
      account: 'Investment Account',
      bankBalance: 'Pending',
      glBalance: '$230,450.00',
      variance: 'Pending',
      status: 'not-started',
      lastUpdated: 'Not started',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'matched':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Matched</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1"><Clock className="h-3 w-3" /> In Progress</Badge>;
      case 'variance':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Variance</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Not Started</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <div className="mb-4">
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">May 2025 Reconciliation In Progress</AlertTitle>
          <AlertDescription className="text-amber-700">
            7 of 12 accounts have been reconciled for the current period. 3 accounts have variances that require attention.
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" className="gap-2 bg-white shadow-sm border-gray-200">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button className="gap-2 bg-primary shadow-sm">
          <PlusCircle className="h-4 w-4" />
          New Reconciliation
        </Button>
      </div>

      <Card className="overflow-hidden border border-gray-200 shadow-sm">
        <CardHeader className="pb-0 border-b bg-gray-50">
          <CardTitle>May 2025 Reconciliations</CardTitle>
          <CardDescription>
            Financial account reconciliations for the current period
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 bg-white p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium flex items-center gap-1">
                    Bank Balance <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium flex items-center gap-1">
                    GL Balance <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium flex items-center gap-1">
                    Variance <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reconciliationItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.account}</TableCell>
                  <TableCell>{item.bankBalance}</TableCell>
                  <TableCell>{item.glBalance}</TableCell>
                  <TableCell className={item.status === 'variance' ? 'text-red-600 font-medium' : ''}>
                    {item.variance}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{item.lastUpdated}</TableCell>
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

export default Reconciliations;
