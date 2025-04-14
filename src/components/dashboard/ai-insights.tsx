
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDashboard } from '../ui/badge-dashboard';
import { Button } from '@/components/ui/button';
import { Lightbulb, ArrowRight, BrainCircuit, AlertCircle } from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'suggestion' | 'alert' | 'prediction';
  actionUrl: string;
}

interface AIInsightsProps {
  insights: Insight[];
}

export function AIInsights({ insights }: AIInsightsProps) {
  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'prediction':
        return <BrainCircuit className="h-5 w-5 text-blue-500" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getInsightBadge = (type: Insight['type']) => {
    switch (type) {
      case 'suggestion':
        return <BadgeDashboard variant="warning">Suggestion</BadgeDashboard>;
      case 'alert':
        return <BadgeDashboard variant="destructive">Alert</BadgeDashboard>;
      case 'prediction':
        return <BadgeDashboard variant="info">Prediction</BadgeDashboard>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>AI Insights</CardTitle>
            <BadgeDashboard variant="secondary">4 New</BadgeDashboard>
          </div>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="flex gap-3 p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted transition-colors"
            >
              <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{insight.title}</h4>
                  {getInsightBadge(insight.type)}
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                    <a href={insight.actionUrl} className="flex items-center gap-1 text-sm font-medium text-primary">
                      Take action <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
