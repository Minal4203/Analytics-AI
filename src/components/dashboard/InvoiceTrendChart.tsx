import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { MonthlyTrend } from '../../types';

const data: MonthlyTrend[] = [
    { month: 'Jul', volume: 110, value: 45000 },
    { month: 'Aug', volume: 150, value: 62000 },
    { month: 'Sep', volume: 130, value: 58000 },
    { month: 'Oct', volume: 180, value: 78000 },
    { month: 'Nov', volume: 160, value: 71000 },
    { month: 'Dec', volume: 210, value: 95000 },
    { month: 'Jan', volume: 190, value: 88000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Month
            </span>
            <span className="font-bold text-muted-foreground">{label}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Value
            </span>
            <span className="font-bold" style={{ color: payload[0].color }}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(payload[0].value)}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Volume
            </span>
            <span className="font-bold" style={{ color: payload[1].color }}>
              {payload[1].value}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const InvoiceTrendChart: React.FC = () => {
  return (
    <>
      <h3 className="font-semibold text-base">Invoice Volume + Value Trend</h3>
      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line yAxisId="left" type="monotone" dataKey="value" name="Value" stroke="#8884d8" strokeWidth={2} dot={{ r: 4, fill: '#8884d8' }} activeDot={{ r: 6 }}/>
            <Line yAxisId="right" type="monotone" dataKey="volume" name="Volume" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4, fill: '#82ca9d' }} activeDot={{ r: 6 }}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default InvoiceTrendChart;
