
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowUpDown, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  PlusCircle, 
  Filter, 
  Users, 
  Layers, 
  ArrowDownAZ,
  DollarSign 
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Reconciliations = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [varianceAmount, setVarianceAmount] = useState('1000');

  const reconciliationItems = [
    {
      id: '1',
      account: 'Cash - Operating Account',
      bankBalance: '$342,518.75',
      glBalance: '$345,122.50',
      variance: '$2,603.75',
      status: 'in-progress',
      lastUpdated: '2 hours ago',
      owner: 'Alex Johnson',
      type: 'Bank'
    },
    {
      id: '2',
      account: 'Accounts Receivable',
      bankBalance: '$128,450.00',
      glBalance: '$128,450.00',
      variance: '$0.00',
      status: 'matched',
      lastUpdated: '1 day ago',
      owner: 'Taylor Smith',
      type: 'AR'
    },
    {
      id: '3',
      account: 'Credit Card',
      bankBalance: '$12,845.32',
      glBalance: '$15,640.29',
      variance: '$2,794.97',
      status: 'variance',
      lastUpdated: '3 hours ago',
      owner: 'Morgan Rivera',
      type: 'Credit Card'
    },
    {
      id: '4',
      account: 'Payroll Account',
      bankBalance: '$56,320.00',
      glBalance: '$56,320.00',
      variance: '$0.00',
      status: 'matched',
      lastUpdated: '1 day ago',
      owner: 'Quinn Foster',
      type: 'Payroll'
    },
    {
      id: '5',
      account: 'Investment Account',
      bankBalance: 'Pending',
      glBalance: '$230,450.00',
      variance: 'Pending',
      status: 'not-started',
      lastUpdated: 'Not started',
      owner: 'Jamie Wong',
      type: 'Investment'
    },
  ];

  // Summary data for the top bar
  const summaryData = {
    reconciledCount: 7,
    totalAccounts: 12,
    totalVariance: '₹5,398.72',
    blockedCount: 2
  };

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

  // Handle View button click for reconciliation detail
  const handleViewReconciliation = (id: string) => {
    navigate(`/reconciliations/${id}`);
  };

  const toggleStatusFilter = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(s => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };

  // Filter the reconciliation items based on the selected filters
  const filteredItems = reconciliationItems.filter(item => {
    // If no status filters are selected, show all
    if (statusFilter.length === 0) {
      return true;
    }
    return statusFilter.includes(item.status);
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Reconciled"
          value={`${summaryData.reconciledCount} / ${summaryData.totalAccounts}`}
          icon={CheckCircle2}
          className="border-green-100"
        />
        <StatCard 
          title="Total Variance"
          value={summaryData.totalVariance}
          icon={DollarSign}
          className="border-amber-100"
        />
        <StatCard 
          title="Blocked"
          value={summaryData.blockedCount.toString()}
          icon={AlertCircle}
          className="border-red-100"
        />
        <StatCard 
          title="Upcoming Due"
          value="5"
          icon={Clock}
          className="border-blue-100"
        />
      </div>

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
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2 bg-white shadow-sm border-gray-200"
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white shadow-sm border-gray-200">
                <ArrowDownAZ className="h-4 w-4" />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
              <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Account Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem>
                Variance (High to Low)
              </DropdownMenuItem>
              <DropdownMenuItem>
                Last Updated
              </DropdownMenuItem>
              <DropdownMenuItem>
                Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="gap-2 bg-primary shadow-sm">
          <PlusCircle className="h-4 w-4" />
          New Reconciliation
        </Button>
      </div>

      {/* Filter panel that shows/hides */}
      {showFilters && (
        <Card className="mb-6 border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Filter Reconciliations</CardTitle>
            <CardDescription>
              Refine the list based on your criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Status Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Status</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-matched" 
                      checked={statusFilter.includes('matched')}
                      onCheckedChange={() => toggleStatusFilter('matched')}
                    />
                    <label
                      htmlFor="status-matched"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Matched
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-in-progress" 
                      checked={statusFilter.includes('in-progress')}
                      onCheckedChange={() => toggleStatusFilter('in-progress')}
                    />
                    <label
                      htmlFor="status-in-progress"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      In Progress
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-variance" 
                      checked={statusFilter.includes('variance')}
                      onCheckedChange={() => toggleStatusFilter('variance')}
                    />
                    <label
                      htmlFor="status-variance"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Variance
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-not-started" 
                      checked={statusFilter.includes('not-started')}
                      onCheckedChange={() => toggleStatusFilter('not-started')}
                    />
                    <label
                      htmlFor="status-not-started"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Not Started
                    </label>
                  </div>
                </div>
              </div>

              {/* Owner Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Owner</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Owners</SelectItem>
                    <SelectItem value="alex">Alex Johnson</SelectItem>
                    <SelectItem value="taylor">Taylor Smith</SelectItem>
                    <SelectItem value="morgan">Morgan Rivera</SelectItem>
                    <SelectItem value="quinn">Quinn Foster</SelectItem>
                    <SelectItem value="jamie">Jamie Wong</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Variance Amount Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Variance Greater Than</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                  <Input 
                    className="pl-7"
                    type="number" 
                    value={varianceAmount}
                    onChange={(e) => setVarianceAmount(e.target.value)}
                    placeholder="1000"
                  />
                </div>
              </div>

              {/* Reconciliation Type Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Reconciliation Type</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="bank">Bank</SelectItem>
                    <SelectItem value="ar">Accounts Receivable</SelectItem>
                    <SelectItem value="ap">Accounts Payable</SelectItem>
                    <SelectItem value="cc">Credit Card</SelectItem>
                    <SelectItem value="payroll">Payroll</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" onClick={() => {
                setStatusFilter([]);
                setVarianceAmount('1000');
              }}>
                Reset Filters
              </Button>
              <Button>
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                <TableHead>Owner</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.account}</TableCell>
                  <TableCell>{item.bankBalance}</TableCell>
                  <TableCell>{item.glBalance}</TableCell>
                  <TableCell className={item.status === 'variance' ? 'text-red-600 font-medium' : ''}>
                    {item.variance}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.owner}</TableCell>
                  <TableCell className="text-muted-foreground">{item.lastUpdated}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      onClick={() => handleViewReconciliation(item.id)}
                    >
                      View
                    </Button>
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
