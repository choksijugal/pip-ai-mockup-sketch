import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search, BookOpen, MessageSquare, PlayCircle, FileText, 
  Book, MessageCircle, Mail, Phone, HelpCircle 
} from 'lucide-react';

const Help = () => {
  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for help topics..."
            className="w-full bg-background pl-10 py-6 text-base"
          />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Common questions and answers about PipCloseOps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I set up a new bank reconciliation?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    To set up a new bank reconciliation, navigate to the Reconciliations tab and click "New Reconciliation." 
                    From there, you'll be able to select the bank account, specify the time period, and import your bank statement.
                    The system will automatically match transactions, and you can review any unmatched items.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I assign tasks to my team members?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    To assign tasks, go to the Task Engine page and click "Create Task." Fill in the task details, 
                    including the assignee from the dropdown menu. You can set due dates, priority levels, and attach 
                    relevant documents. Team members will be notified via email when a task is assigned to them.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How does the AI assistant help with my financial tasks?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Our AI assistant can help with various financial tasks, including identifying reconciliation discrepancies, 
                    suggesting journal entries, analyzing financial data, and providing insights based on your company's financial patterns. 
                    Simply ask questions in natural language, and the AI will assist with finding information and automating routine tasks.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I connect my accounting system to PipCloseOps?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    To connect your accounting system, go to Settings → Integrations and select your accounting software from 
                    the list of supported systems. Follow the authentication process, which typically involves logging in to 
                    your accounting system and granting permission for PipCloseOps to access your data. We support major systems 
                    including QuickBooks, Xero, NetSuite, and Sage.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How secure is my financial data in PipCloseOps?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    PipCloseOps uses bank-level encryption for all data, both in transit and at rest. We maintain SOC 2 
                    compliance and undergo regular security audits. Your data is stored in secure, redundant data centers, 
                    and we never share your information with third parties without your explicit permission. You can review 
                    our full security practices in our Security Center.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All FAQs</Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start text-left h-auto py-3 gap-2">
                <MessageSquare className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span>Live Chat</span>
                  <span className="text-xs text-muted-foreground">Available 24/7</span>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left h-auto py-3 gap-2">
                <Mail className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span>Email Support</span>
                  <span className="text-xs text-muted-foreground">Response within 24 hours</span>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left h-auto py-3 gap-2">
                <Phone className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span>Phone Support</span>
                  <span className="text-xs text-muted-foreground">Mon-Fri, 9AM-5PM ET</span>
                </div>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Learning Resources</CardTitle>
              <CardDescription>Explore our learning materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start text-left h-auto py-3 gap-2">
                <BookOpen className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span>Documentation</span>
                  <span className="text-xs text-muted-foreground">Comprehensive guides</span>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left h-auto py-3 gap-2">
                <PlayCircle className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span>Video Tutorials</span>
                  <span className="text-xs text-muted-foreground">Step-by-step walkthroughs</span>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left h-auto py-3 gap-2">
                <FileText className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span>Webinars</span>
                  <span className="text-xs text-muted-foreground">Live and recorded sessions</span>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Help;
