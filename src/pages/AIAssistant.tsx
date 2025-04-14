import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Sparkles, FileQuestion, AlertCircle, Lightbulb, MessagesSquare, RefreshCw } from 'lucide-react';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send the message to the backend
    // For now, let's just clear the input
    setMessage('');
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader className="border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary/10">
                  <AvatarFallback className="text-primary text-sm font-medium">AI</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Finance AI Assistant</CardTitle>
                  <CardDescription className="text-xs">Powered by GPT-4</CardDescription>
                </div>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 h-[calc(100%-8rem)]">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="mt-1 h-8 w-8 bg-primary/10">
                    <AvatarFallback className="text-primary text-sm font-medium">AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-muted p-3 text-sm">
                    <p>Hello, Sarah! I'm your financial assistant. How can I help you today with your closing tasks?</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end">
                  <div className="rounded-lg bg-primary text-primary-foreground p-3 text-sm">
                    <p>Can you help me find the bank reconciliation variance for the operating account?</p>
                  </div>
                  <Avatar className="mt-1 h-8 w-8">
                    <AvatarFallback className="bg-blue-600">SJ</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex items-start gap-3">
                  <Avatar className="mt-1 h-8 w-8 bg-primary/10">
                    <AvatarFallback className="text-primary text-sm font-medium">AI</AvatarFallback>
                  </Avatar>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      <p>I've analyzed the operating account reconciliation and found a variance of $2,603.75. The variance appears to be due to three outstanding checks and an unrecorded bank fee.</p>
                      <ul className="list-disc pl-5 pt-2 space-y-1">
                        <li>Check #4523 for $1,250.00 issued 5/27/2025</li>
                        <li>Check #4524 for $842.50 issued 5/28/2025</li>
                        <li>Check #4525 for $375.25 issued 5/28/2025</li>
                        <li>Bank fee of $136.00 for wire transfer on 5/26/2025</li>
                      </ul>
                      <p className="pt-2">Would you like me to prepare the journal entry to record the bank fee?</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </ScrollArea>
            <CardFooter className="border-t p-3">
              <form onSubmit={handleSendMessage} className="flex gap-2 w-full">
                <Input 
                  placeholder="Ask a question..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!message}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <FileQuestion className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Answer Questions</h4>
                  <p className="text-sm text-muted-foreground">Get answers about financial data, policies, and procedures</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Issue Detection</h4>
                  <p className="text-sm text-muted-foreground">Identify reconciliation issues and discrepancies</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Generate Insights</h4>
                  <p className="text-sm text-muted-foreground">Analyze financial data for trends and recommendations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MessagesSquare className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Create Documentation</h4>
                  <p className="text-sm text-muted-foreground">Draft explanations for variances and reconciliations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Suggested Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="text-sm w-full justify-start text-left h-auto py-2">
                Explain the variance in the Credit Card account
              </Button>
              <Button variant="outline" className="text-sm w-full justify-start text-left h-auto py-2">
                Generate journal entry for bank fees
              </Button>
              <Button variant="outline" className="text-sm w-full justify-start text-left h-auto py-2">
                Analyze AR aging trends for the past 6 months
              </Button>
              <Button variant="outline" className="text-sm w-full justify-start text-left h-auto py-2">
                Help me understand revenue recognition for subscription sales
              </Button>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-xs flex items-center gap-1">
                <RefreshCw className="h-3 w-3" /> Refresh Suggestions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
