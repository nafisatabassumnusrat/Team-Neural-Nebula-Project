import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  variant?: 'default' | 'carbon' | 'deforestation' | 'health';
}

const variantStyles = {
  default: 'border-border',
  carbon: 'border-satellite-carbon/30 bg-satellite-carbon/5',
  deforestation: 'border-satellite-deforestation/30 bg-satellite-deforestation/5',
  health: 'border-success/30 bg-success/5',
};

export default function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  description,
  variant = 'default'
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (!change) return null;
    return changeType === 'positive' ? TrendingUp : TrendingDown;
  };

  const TrendIcon = getTrendIcon();

  return (
    <div className={cn(
      "bg-card border rounded-xl p-6 transition-all duration-200 hover:shadow-lg",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            
            {change && (
              <div className="flex items-center space-x-1">
                {TrendIcon && (
                  <TrendIcon className={cn(
                    "w-3 h-3",
                    changeType === 'positive' ? 'text-success' : 'text-destructive'
                  )} />
                )}
                <span className={cn(
                  "text-xs font-medium",
                  changeType === 'positive' ? 'text-success' : 'text-destructive'
                )}>
                  {change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
            
            {description && (
              <p className="text-xs text-muted-foreground mt-2">{description}</p>
            )}
          </div>
        </div>
        
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center",
          variant === 'carbon' && "bg-satellite-carbon/20",
          variant === 'deforestation' && "bg-satellite-deforestation/20",
          variant === 'health' && "bg-success/20",
          variant === 'default' && "bg-primary/20"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            variant === 'carbon' && "text-satellite-carbon",
            variant === 'deforestation' && "text-satellite-deforestation",
            variant === 'health' && "text-success",
            variant === 'default' && "text-primary"
          )} />
        </div>
      </div>
    </div>
  );
}