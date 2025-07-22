
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { cn } from '../../utils/cn';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  colorClass: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <Card className="relative overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      <div className={cn("absolute top-0 h-1.5 w-full", colorClass)}></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
      </CardContent>
    </Card>
  );
};
