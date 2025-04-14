
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BadgeDashboard } from '../ui/badge-dashboard';
import { ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
  tooltip?: string;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, change, tooltip, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              {tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/70" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">{tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-semibold leading-none tracking-tight">{value}</span>
              {change && (
                <BadgeDashboard
                  variant={
                    change.type === 'increase'
                      ? 'success'
                      : change.type === 'decrease'
                      ? 'destructive'
                      : 'secondary'
                  }
                  className="mb-1 flex items-center gap-0.5"
                >
                  {change.type === 'increase' ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : change.type === 'decrease' ? (
                    <ArrowDown className="h-3 w-3" />
                  ) : null}
                  {change.value}
                </BadgeDashboard>
              )}
            </div>
          </div>
          <div className="rounded-full p-2 bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
