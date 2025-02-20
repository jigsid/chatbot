import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';

type EmailAnalytics = {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
};

type EmailAnalyticsProps = {
  campaignId: string;
  analytics: EmailAnalytics;
};

const EmailAnalytics: React.FC<EmailAnalyticsProps> = ({ analytics }) => {
  const calculatePercentage = (value: number) => {
    return (value / analytics.sent) * 100;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Campaign Analytics</CardTitle>
        <CardDescription>Track your email campaign performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>Delivered</span>
            <span>{calculatePercentage(analytics.delivered).toFixed(1)}%</span>
          </div>
          <Progress value={calculatePercentage(analytics.delivered)} />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span>Opened</span>
            <span>{calculatePercentage(analytics.opened).toFixed(1)}%</span>
          </div>
          <Progress value={calculatePercentage(analytics.opened)} />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span>Clicked</span>
            <span>{calculatePercentage(analytics.clicked).toFixed(1)}%</span>
          </div>
          <Progress value={calculatePercentage(analytics.clicked)} />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span>Bounced</span>
            <span>{calculatePercentage(analytics.bounced).toFixed(1)}%</span>
          </div>
          <Progress value={calculatePercentage(analytics.bounced)} className="bg-red-100" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{analytics.sent}</div>
              <p className="text-xs text-muted-foreground">Total Sent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {((analytics.opened / analytics.delivered) * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Open Rate</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailAnalytics; 