
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReconciliationComparison } from '@/components/reconciliation/reconciliation-comparison';
import { ReconciliationStatusDetail } from '@/components/reconciliation/reconciliation-status-detail';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ReconciliationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock reconciliation data - in a real app, this would be fetched from an API
  const reconciliationData = {
    id: '1',
    account: 'Cash - Operating Account',
    bankBalance: 342518.75,
    glBalance: 345122.50,
    variance: 2603.75,
    status: 'in-progress',
    lastUpdated: '2 hours ago',
    // Status breakdown for the pie chart
    statusBreakdown: [
      { name: 'Matched', value: 42, color: '#10B981', status: 'matched' as const },
      { name: 'Variance', value: 5, color: '#EF4444', status: 'variance' as const },
      { name: 'In Progress', value: 8, color: '#3B82F6', status: 'in-progress' as const },
      { name: 'Not Started', value: 12, color: '#9CA3AF', status: 'not-started' as const },
    ],
    // Detailed transaction entries
    entries: [
      {
        date: '05/24/2025',
        reference: 'CHK-1234',
        description: 'Vendor Payment - Office Supplies',
        bankAmount: 1250.00,
        glAmount: 1250.00,
        variance: 0,
        matched: true,
      },
      {
        date: '05/24/2025',
        reference: 'DEP-5678',
        description: 'Customer Deposit - ABC Corp',
        bankAmount: 8750.00,
        glAmount: 8750.00,
        variance: 0,
        matched: true,
      },
      {
        date: '05/25/2025',
        reference: 'WDR-2234',
        description: 'ATM Withdrawal',
        bankAmount: 500.00,
        glAmount: null,
        variance: 500.00,
        matched: false,
      },
      {
        date: '05/25/2025',
        reference: 'INT-3456',
        description: 'Interest Payment',
        bankAmount: 125.75,
        glAmount: 125.75,
        variance: 0,
        matched: true,
      },
      {
        date: '05/26/2025',
        reference: 'CHK-2345',
        description: 'Payroll Payment',
        bankAmount: 18675.50,
        glAmount: 18675.50,
        variance: 0,
        matched: true,
      },
      {
        date: '05/26/2025',
        reference: 'FEE-1122',
        description: 'Monthly Service Fee',
        bankAmount: 35.00,
        glAmount: null,
        variance: 35.00,
        matched: false,
      },
      {
        date: '05/27/2025',
        reference: 'CHK-3456',
        description: 'Rent Payment',
        bankAmount: 4500.00,
        glAmount: 4500.00,
        variance: 0,
        matched: true,
      },
      {
        date: '05/27/2025',
        reference: 'GL-5522',
        description: 'Software Subscription',
        bankAmount: null,
        glAmount: 2175.50,
        variance: 2175.50,
        matched: false,
      },
      {
        date: '05/28/2025',
        reference: 'TRF-6789',
        description: 'Transfer to Savings',
        bankAmount: 5000.00,
        glAmount: 5000.00,
        variance: 0,
        matched: true,
      },
      {
        date: '05/28/2025',
        reference: 'DEP-7890',
        description: 'Customer Deposit - XYZ Inc',
        bankAmount: 12450.75,
        glAmount: 12557.50,
        variance: -106.75,
        matched: false,
      },
    ],
  };

  // In a real app, you would check if the data is loading or validate if the reconciliation exists
  if (!reconciliationData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          className="gap-2 bg-white shadow-sm border-gray-200"
          onClick={() => navigate('/reconciliations')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reconciliations
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-white shadow-sm border-gray-200">
            <Download className="h-4 w-4" />
            Export
          </Button>
          {reconciliationData.status === 'matched' ? (
            <Button className="gap-2 bg-green-600 shadow-sm hover:bg-green-700">
              <CheckCircle className="h-4 w-4" />
              Approved
            </Button>
          ) : reconciliationData.variance !== 0 ? (
            <Button className="gap-2 bg-red-600 shadow-sm hover:bg-red-700">
              <XCircle className="h-4 w-4" />
              Resolve Variances
            </Button>
          ) : (
            <Button className="gap-2 bg-primary shadow-sm">
              <CheckCircle className="h-4 w-4" />
              Approve Reconciliation
            </Button>
          )}
        </div>
      </div>
      
      {reconciliationData.variance !== 0 && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertDescription className="text-amber-700">
            This reconciliation has a variance of {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(reconciliationData.variance)}. Please review the entries marked with variance.
          </AlertDescription>
        </Alert>
      )}
      
      <ReconciliationStatusDetail 
        data={reconciliationData.statusBreakdown}
        totalBankAmount={reconciliationData.bankBalance}
        totalGLAmount={reconciliationData.glBalance}
        variance={reconciliationData.variance}
        accountName={reconciliationData.account}
        lastUpdated={reconciliationData.lastUpdated}
      />
      
      <ReconciliationComparison 
        entries={reconciliationData.entries}
        accountName={reconciliationData.account}
      />
    </div>
  );
};

export default ReconciliationDetail;
