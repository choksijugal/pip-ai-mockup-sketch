import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, Lock, Bell, CreditCard, Globe, Database, 
  UserCog, Building, ArrowRightLeft, Calendar 
} from 'lucide-react';

const Settings = () => {
  return (
    <>
      <Tabs defaultValue="profile" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">User Settings</div>
              <TabsTrigger value="profile" className="justify-start px-2 h-9 data-[state=active]:bg-muted">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start px-2 h-9 data-[state=active]:bg-muted">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start px-2 h-9 data-[state=active]:bg-muted">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <div className="text-xs font-medium text-muted-foreground mb-2 mt-4 px-2">Organization Settings</div>
              <TabsTrigger value="organization" className="justify-start px-2 h-9 data-[state=active]:bg-muted">
                <Building className="h-4 w-4 mr-2" />
                Organization
              </TabsTrigger>
              <TabsTrigger value="billing" className="justify-start px-2 h-9 data-[state=active]:bg-muted">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
                <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-100">Pro</Badge>
              </TabsTrigger>
              <TabsTrigger value="team" className="justify-start px-2 h-9 data-[state=active]:bg-muted">
                <UserCog className="h-4 w-4 mr-2" />
                Team
              </TabsTrigger>
              <div className="text-xs font-medium text-muted-foreground mb-2 mt-4 px-2">System Settings</div>
              <TabsTrigger value="integrations" className="justify-start px-2 h-9 data-[state=active]:bg-muted">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="data" className="justify-start px-2 h-9 data-[state=active]:bg-muted">
                <Database className="h-4 w-4 mr-2" />
                Data Management
              </TabsTrigger>
              <TabsTrigger value="fiscal" className="justify-start px-2 h-9 data-[state=active]:bg-muted">
                <Calendar className="h-4 w-4 mr-2" />
                Fiscal Calendar
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1">
            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Manage your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Sarah Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="sarah.johnson@pipcloseops.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Title</Label>
                    <Input id="role" defaultValue="Finance Director" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="Pacific Time (UTC-7)" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Password</h3>
                    <div className="grid gap-2">
                      <Button variant="outline" className="w-full md:w-auto justify-start">
                        Change Password
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Strengthen your account security with 2FA</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Active Sessions</h3>
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">San Francisco, United States</p>
                          <p className="text-sm text-muted-foreground">Chrome on MacOS • Current session</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Log Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Task assignments and updates</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">System alerts and notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Monthly reports and summaries</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Browser Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Enable browser notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Task due date reminders</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="organization" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Settings</CardTitle>
                  <CardDescription>
                    Manage your organization profile and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input id="org-name" defaultValue="Acme Corporation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" defaultValue="Technology" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Tech Boulevard, San Francisco, CA 94107" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">Billing settings would be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>
                    Connect your financial systems and services
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">Integrations settings would be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </>
  );
};

export default Settings;
