
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDashboard } from '../ui/badge-dashboard';
import { Button } from '@/components/ui/button';
import { Cloud, RefreshCw, AlertTriangle } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'error' | 'pending';
  lastSync: string;
}

interface SystemIntegrationsProps {
  integrations: Integration[];
}

export function SystemIntegrations({ integrations }: SystemIntegrationsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Integrations</CardTitle>
            <CardDescription>Connected data sources</CardDescription>
          </div>
          <Button variant="outline" size="sm">Add New</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md flex items-center justify-center bg-primary/10">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <div>
                  <div className="font-medium text-sm">{integration.name}</div>
                  <div className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {integration.status === 'connected' ? (
                  <BadgeDashboard variant="success" className="flex items-center gap-1">
                    <Cloud className="h-3 w-3" />
                    <span>Connected</span>
                  </BadgeDashboard>
                ) : integration.status === 'error' ? (
                  <BadgeDashboard variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Error</span>
                  </BadgeDashboard>
                ) : (
                  <BadgeDashboard variant="warning" className="flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" />
                    <span>Pending</span>
                  </BadgeDashboard>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
