
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InfoIcon } from 'lucide-react';

interface ReconciliationEntry {
  date: string;
  reference: string;
  description: string;
  bankAmount: number | null;
  glAmount: number | null;
  variance: number | null; // Can be null if entry exists in only one side
  matched: boolean;
}

interface ReconciliationComparisonProps {
  entries: ReconciliationEntry[];
  accountName: string;
}

export function ReconciliationComparison({ entries, accountName }: ReconciliationComparisonProps) {
  // Format currency with $ sign and 2 decimal places
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate totals
  const totals = entries.reduce(
    (acc, entry) => {
      acc.bankTotal += entry.bankAmount || 0;
      acc.glTotal += entry.glAmount || 0;
      acc.varianceTotal += entry.variance || 0;
      return acc;
    },
    { bankTotal: 0, glTotal: 0, varianceTotal: 0 }
  );

  return (
    <Card className="overflow-hidden border border-gray-200 shadow-sm">
      <CardHeader className="pb-3 border-b bg-gray-50">
        <CardTitle>{accountName} Reconciliation</CardTitle>
        <CardDescription>
          Detailed comparison of bank statement and general ledger entries
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Bank Amount</TableHead>
              <TableHead className="text-right">GL Amount</TableHead>
              <TableHead className="text-right">Variance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow 
                key={index}
                className={
                  entry.variance && entry.variance !== 0 
                    ? 'bg-red-50 hover:bg-red-100' 
                    : 'hover:bg-gray-50'
                }
              >
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.reference}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(entry.bankAmount)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(entry.glAmount)}
                </TableCell>
                <TableCell 
                  className={`text-right font-mono font-medium ${
                    entry.variance ? 'text-red-600' : ''
                  }`}
                >
                  {formatCurrency(entry.variance)}
                </TableCell>
                <TableCell>
                  {entry.matched ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Matched
                    </Badge>
                  ) : entry.variance === null ? (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1">
                      <InfoIcon className="h-3 w-3" />
                      Missing Entry
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                      Variance
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
            
            {/* Summary Row */}
            <TableRow className="bg-gray-50 font-medium">
              <TableCell colSpan={3} className="text-right">
                Totals
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(totals.bankTotal)}
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(totals.glTotal)}
              </TableCell>
              <TableCell 
                className={`text-right font-mono font-medium ${
                  totals.varianceTotal !== 0 ? 'text-red-600' : ''
                }`}
              >
                {formatCurrency(totals.varianceTotal)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
