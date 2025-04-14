
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, AlertCircle, Clock, Mail, MessageSquare, FileText, X, Send, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReconciliationEntry {
  date: string;
  reference: string;
  description: string;
  bankAmount: number | null;
  glAmount: number | null;
  variance: number | null;
  matched: boolean;
}

interface VarianceItem extends ReconciliationEntry {
  id: string;
  status: 'unresolved' | 'in-progress' | 'resolved';
  comments: {
    id: string;
    timestamp: string;
    user: string;
    text: string;
  }[];
}

interface ResolveVariancesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entries: ReconciliationEntry[];
  accountName: string;
}

export function ResolveVariancesDialog({ open, onOpenChange, entries, accountName }: ResolveVariancesDialogProps) {
  const { toast } = useToast();
  const [varianceItems, setVarianceItems] = useState<VarianceItem[]>(
    entries
      .filter(entry => entry.variance !== null && entry.variance !== 0)
      .map(entry => ({
        ...entry,
        id: Math.random().toString(36).substring(2, 9),
        status: 'unresolved' as const,
        comments: [],
      }))
  );
  
  const [selectedVariance, setSelectedVariance] = useState<VarianceItem | null>(null);
  const [commentText, setCommentText] = useState("");
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailRecipients, setEmailRecipients] = useState("accounting@example.com");
  
  // Calculate progress statistics
  const totalVariances = varianceItems.length;
  const resolvedVariances = varianceItems.filter(item => item.status === 'resolved').length;
  const progressPercentage = totalVariances > 0 ? Math.round((resolvedVariances / totalVariances) * 100) : 0;
  
  // Format currency with $ sign and 2 decimal places
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  // Function to handle viewing the details of a variance
  const handleViewVariance = (item: VarianceItem) => {
    setSelectedVariance(item);
    setSideSheetOpen(true);
  };
  
  // Function to handle adding a comment
  const handleAddComment = () => {
    if (!selectedVariance || !commentText.trim()) return;
    
    const newComment = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleString(),
      user: "John Doe", // In a real app, this would be the current user
      text: commentText,
    };
    
    setVarianceItems(items => 
      items.map(item => 
        item.id === selectedVariance.id 
          ? { ...item, comments: [...item.comments, newComment] }
          : item
      )
    );
    
    // Update the selected variance for the UI
    setSelectedVariance(prev => 
      prev ? { ...prev, comments: [...prev.comments, newComment] } : null
    );
    
    setCommentText("");
    
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the variance.",
    });
  };
  
  // Function to handle resolving a variance
  const handleResolveVariance = (resolutionType: string) => {
    if (!selectedVariance) return;
    
    const resolutionComment = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleString(),
      user: "John Doe", // In a real app, this would be the current user
      text: `Resolved as: ${resolutionType}`,
    };
    
    setVarianceItems(items => 
      items.map(item => 
        item.id === selectedVariance.id 
          ? { 
              ...item, 
              status: 'resolved' as const,
              comments: [...item.comments, resolutionComment] 
            }
          : item
      )
    );
    
    // Update the selected variance for the UI
    setSelectedVariance(prev => 
      prev ? { 
        ...prev, 
        status: 'resolved' as const,
        comments: [...prev.comments, resolutionComment] 
      } : null
    );
    
    toast({
      title: "Variance Resolved",
      description: `The variance has been marked as resolved due to ${resolutionType}.`,
    });
  };
  
  // Function to handle sending an email to the team
  const handleOpenEmailDialog = () => {
    if (!selectedVariance) return;
    
    // Prepare default email content
    setEmailSubject(`Variance Resolution Needed: ${selectedVariance.reference} - ${formatCurrency(selectedVariance.variance || 0)}`);
    
    setEmailBody(`
Dear Team,

I need your assistance with resolving a variance in the ${accountName} reconciliation:

Transaction Details:
- Date: ${selectedVariance.date}
- Reference: ${selectedVariance.reference}
- Description: ${selectedVariance.description}
- Bank Amount: ${formatCurrency(selectedVariance.bankAmount)}
- GL Amount: ${formatCurrency(selectedVariance.glAmount)}
- Variance: ${formatCurrency(selectedVariance.variance)}

Please review and provide clarification on how to resolve this variance.

Thank you,
[Your Name]
    `.trim());
    
    setEmailDialogOpen(true);
  };
  
  // Function to handle sending the email (mock)
  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: "Your request for clarification has been sent to the team.",
    });
    
    // Add a comment to the variance about the email sent
    if (selectedVariance) {
      const emailComment = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleString(),
        user: "John Doe", // In a real app, this would be the current user
        text: `Email sent to ${emailRecipients} requesting clarification.`,
      };
      
      setVarianceItems(items => 
        items.map(item => 
          item.id === selectedVariance.id 
            ? { 
                ...item, 
                status: 'in-progress' as const,
                comments: [...item.comments, emailComment] 
              }
            : item
        )
      );
      
      // Update the selected variance for the UI
      setSelectedVariance(prev => 
        prev ? { 
          ...prev, 
          status: 'in-progress' as const,
          comments: [...prev.comments, emailComment] 
        } : null
      );
    }
    
    setEmailDialogOpen(false);
  };
  
  // Function to complete the reconciliation process
  const handleCompleteReconciliation = () => {
    if (resolvedVariances < totalVariances) {
      toast({
        title: "Cannot Complete",
        description: `There are still ${totalVariances - resolvedVariances} unresolved variances.`,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Reconciliation Completed",
      description: "All variances have been successfully resolved.",
    });
    
    onOpenChange(false);
  };
  
  const getStatusBadge = (status: 'unresolved' | 'in-progress' | 'resolved') => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Resolved</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1"><Clock className="h-3 w-3" /> In Progress</Badge>;
      case 'unresolved':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Unresolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Resolve Variances - {accountName}</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Progress bar */}
            <div className="mb-4 px-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Progress: {resolvedVariances} of {totalVariances} resolved</span>
                <span className="text-sm font-medium">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${progressPercentage === 100 ? 'bg-green-600' : 'bg-blue-600'}`} 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Table of variances */}
            <div className="flex-1 overflow-auto border rounded-md">
              <Table>
                <TableHeader className="bg-gray-50 sticky top-0">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Bank Amount</TableHead>
                    <TableHead className="text-right">GL Amount</TableHead>
                    <TableHead className="text-right">Variance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {varianceItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No variances to resolve
                      </TableCell>
                    </TableRow>
                  ) : (
                    varianceItems.map((item) => (
                      <TableRow 
                        key={item.id}
                        className={
                          item.status === 'resolved' 
                            ? 'bg-green-50 hover:bg-green-100' 
                            : item.status === 'in-progress'
                              ? 'bg-blue-50 hover:bg-blue-100'
                              : 'bg-red-50 hover:bg-red-100'
                        }
                      >
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.reference}</TableCell>
                        <TableCell className="max-w-[150px] truncate">{item.description}</TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(item.bankAmount)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(item.glAmount)}
                        </TableCell>
                        <TableCell className="text-right font-mono font-medium text-red-600">
                          {formatCurrency(item.variance)}
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            onClick={() => handleViewVariance(item)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <DialogFooter className="mt-4 gap-2">
            <div className="mr-auto">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
            
            <Button 
              className={`gap-2 ${progressPercentage === 100 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 hover:bg-gray-500'}`}
              disabled={progressPercentage < 100}
              onClick={handleCompleteReconciliation}
            >
              <CheckCircle2 className="h-4 w-4" />
              Complete Reconciliation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Side sheet for selected variance details */}
      <Sheet open={sideSheetOpen} onOpenChange={setSideSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          {selectedVariance && (
            <>
              <SheetHeader className="mb-4">
                <SheetTitle>Variance Details</SheetTitle>
                <SheetDescription>
                  Reference: {selectedVariance.reference}
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6">
                {/* Transaction Details */}
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-base">Transaction Information</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Date:</span>
                      <span className="text-sm font-medium">{selectedVariance.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Description:</span>
                      <span className="text-sm font-medium">{selectedVariance.description}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Bank Amount:</span>
                      <span className="text-sm font-medium font-mono">{formatCurrency(selectedVariance.bankAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">GL Amount:</span>
                      <span className="text-sm font-medium font-mono">{formatCurrency(selectedVariance.glAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Variance:</span>
                      <span className="text-sm font-medium font-mono text-red-600">{formatCurrency(selectedVariance.variance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span>{getStatusBadge(selectedVariance.status)}</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Resolution Options */}
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-base">Resolution Options</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4 grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="text-xs justify-start h-auto py-2"
                      onClick={() => handleResolveVariance('Bank Error')}
                      disabled={selectedVariance.status === 'resolved'}
                    >
                      Bank Error
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs justify-start h-auto py-2"
                      onClick={() => handleResolveVariance('Missing GL Entry')}
                      disabled={selectedVariance.status === 'resolved'}
                    >
                      Missing GL Entry
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs justify-start h-auto py-2"
                      onClick={() => handleResolveVariance('Timing Difference')}
                      disabled={selectedVariance.status === 'resolved'}
                    >
                      Timing Difference
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs justify-start h-auto py-2"
                      onClick={() => handleResolveVariance('Bank Fee')}
                      disabled={selectedVariance.status === 'resolved'}
                    >
                      Bank Fee
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs justify-start h-auto py-2 col-span-2"
                      onClick={() => handleResolveVariance('Custom Resolution')}
                      disabled={selectedVariance.status === 'resolved'}
                    >
                      Custom Resolution
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Email Team */}
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={handleOpenEmailDialog}
                  disabled={selectedVariance.status === 'resolved'}
                >
                  <Mail className="h-4 w-4" />
                  Email Team for Clarification
                </Button>
                
                {/* Comments Section */}
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-base">Audit Log & Comments</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <ScrollArea className="h-40 pr-4">
                      {selectedVariance.comments.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 text-sm">
                          No comments yet
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedVariance.comments.map(comment => (
                            <div key={comment.id} className="border-b pb-2">
                              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                <span className="font-medium">{comment.user}</span>
                                <span>•</span>
                                <span>{comment.timestamp}</span>
                              </div>
                              <p className="text-sm">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                    
                    {/* Add comment */}
                    <div className="mt-3 space-y-2">
                      <Textarea 
                        placeholder="Add a comment..."
                        className="resize-none"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <Button 
                        className="w-full gap-2"
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Add Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Supporting Documentation */}
                <Button variant="outline" className="w-full gap-2" disabled>
                  <FileText className="h-4 w-4" />
                  Attach Supporting Document
                </Button>
              </div>
              
              <SheetFooter className="mt-4">
                <Button 
                  className={`w-full gap-2 ${selectedVariance.status === 'resolved' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  disabled={selectedVariance.status === 'resolved'}
                  onClick={() => {
                    handleResolveVariance('Manual Verification');
                    setSideSheetOpen(false);
                  }}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {selectedVariance.status === 'resolved' ? 'Resolved' : 'Mark as Resolved'}
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
      
      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Team for Clarification</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">To:</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={emailRecipients}
                onChange={(e) => setEmailRecipients(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject:</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Message:</label>
              <Textarea
                className="min-h-[200px]"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="gap-2" onClick={handleSendEmail}>
              <Send className="h-4 w-4" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
