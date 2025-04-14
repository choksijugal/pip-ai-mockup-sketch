import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart3, PieChart, LineChart, Share2, Download, Calendar } from 'lucide-react';

const Reports = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          May 2025
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="income">Income Statement</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cash" className="hidden md:flex">Cash Flow</TabsTrigger>
          <TabsTrigger value="custom" className="hidden md:flex">Custom Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  Chart Visualization Placeholder
                </div>
                <div className="text-sm text-center mt-2">
                  <p className="font-medium">Total Revenue: $1.45M</p>
                  <p className="text-muted-foreground">+12% from previous month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-primary" />
                  Expense Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  Chart Visualization Placeholder
                </div>
                <div className="text-sm text-center mt-2">
                  <p className="font-medium">Total Expenses: $920K</p>
                  <p className="text-muted-foreground">-3% from previous month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-primary" />
                  Monthly Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  Chart Visualization Placeholder
                </div>
                <div className="text-sm text-center mt-2">
                  <p className="font-medium">Net Income: $530K</p>
                  <p className="text-muted-foreground">+18% from previous month</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Financial Highlights</CardTitle>
              <CardDescription>Key metrics for May 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Gross Margin</p>
                  <p className="text-2xl font-bold">63.4%</p>
                  <p className="text-sm text-green-600">+2.1% YoY</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Operating Expenses</p>
                  <p className="text-2xl font-bold">$920K</p>
                  <p className="text-sm text-green-600">-5.3% YoY</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">EBITDA</p>
                  <p className="text-2xl font-bold">$610K</p>
                  <p className="text-sm text-green-600">+15.2% YoY</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Cash Position</p>
                  <p className="text-2xl font-bold">$3.2M</p>
                  <p className="text-sm text-green-600">+8.7% YoY</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="income" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Income Statement</CardTitle>
              <CardDescription>For the period ending May 31, 2025</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Income Statement would be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="balance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>As of May 31, 2025</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Balance Sheet would be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cash" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Statement</CardTitle>
              <CardDescription>For the period ending May 31, 2025</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Cash Flow Statement would be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Create and view custom financial reports</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Custom Reports Builder would be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Reports;
