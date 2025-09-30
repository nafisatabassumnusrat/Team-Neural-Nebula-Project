import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface DataChartProps {
  title: string;
  data: any[];
  type?: 'line' | 'area' | 'bar';
  dataKeys: string[];
  colors?: string[];
  height?: number;
}

// Sample data for different chart types
const forestCoverData = [
  { month: 'Jan', coverage: 85.2, deforestation: 2.1, reforestation: 0.8 },
  { month: 'Feb', coverage: 84.8, deforestation: 2.3, reforestation: 1.1 },
  { month: 'Mar', coverage: 84.1, deforestation: 2.8, reforestation: 1.3 },
  { month: 'Apr', coverage: 83.7, deforestation: 3.1, reforestation: 1.7 },
  { month: 'May', coverage: 83.2, deforestation: 3.4, reforestation: 2.1 },
  { month: 'Jun', coverage: 82.9, deforestation: 3.6, reforestation: 2.4 },
];

const carbonStockData = [
  { month: 'Jan', stored: 450, absorbed: 15, released: 8 },
  { month: 'Feb', stored: 448, absorbed: 14, released: 9 },
  { month: 'Mar', stored: 445, absorbed: 13, released: 12 },
  { month: 'Apr', stored: 442, absorbed: 12, released: 15 },
  { month: 'May', stored: 438, absorbed: 11, released: 18 },
  { month: 'Jun', stored: 435, absorbed: 10, released: 20 },
];

const biodiversityData = [
  { region: 'Amazon', health: 78, diversity: 85, threat: 32 },
  { region: 'Congo', health: 65, diversity: 72, threat: 45 },
  { region: 'Indonesia', health: 52, diversity: 68, threat: 58 },
  { region: 'Pantanal', health: 81, diversity: 76, threat: 28 },
  { region: 'Borneo', health: 49, diversity: 64, threat: 62 },
];

export const ForestCoverChart = () => (
  <DataChart
    title="Forest Cover Trends"
    data={forestCoverData}
    type="area"
    dataKeys={['coverage']}
    colors={['hsl(var(--success))'] }
    height={300}
  />
);

export const CarbonStockChart = () => (
  <DataChart
    title="Carbon Stock Analysis"
    data={carbonStockData}
    type="line"
    dataKeys={['stored', 'absorbed', 'released']}
    colors={['hsl(var(--satellite-carbon))', 'hsl(var(--success))', 'hsl(var(--destructive))']}
    height={300}
  />
);

export const BiodiversityChart = () => (
  <DataChart
    title="Ecosystem Health by Region"
    data={biodiversityData}
    type="bar"
    dataKeys={['health', 'diversity', 'threat']}
    colors={['hsl(var(--success))', 'hsl(var(--accent))', 'hsl(var(--destructive))']}
    height={300}
  />
);

export default function DataChart({ 
  title, 
  data, 
  type = 'line', 
  dataKeys, 
  colors = ['hsl(var(--primary))'],
  height = 300 
}: DataChartProps) {
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground capitalize">
                {entry.dataKey}:
              </span>
              <span className="text-sm font-medium text-foreground">
                {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
                {entry.dataKey.includes('coverage') && '%'}
                {entry.dataKey.includes('stored') && ' Mt CO₂'}
                {entry.dataKey.includes('absorbed') && ' Mt CO₂'}
                {entry.dataKey.includes('released') && ' Mt CO₂'}
                {entry.dataKey.includes('health') && '/100'}
                {entry.dataKey.includes('diversity') && '/100'}
                {entry.dataKey.includes('threat') && '%'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      height,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={customTooltip} />
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index] || colors[0]}
                fill={colors[index] || colors[0]}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="region" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={customTooltip} />
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index] || colors[0]}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </BarChart>
        );

      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={customTooltip} />
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index] || colors[0]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}