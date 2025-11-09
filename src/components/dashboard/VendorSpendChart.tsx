import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';
import { VendorSpend } from '../../types';

const data: VendorSpend[] = [
  { vendor: 'Costco Wholesale', spend: 45670 },
  { vendor: 'Amazon Web Services', spend: 39870 },
  { vendor: 'Office Depot', spend: 31200 },
  { vendor: 'Staples', spend: 28900 },
  { vendor: 'Slack', spend: 25400 },
  { vendor: 'Figma', spend: 21800 },
  { vendor: 'Vercel', spend: 19500 },
  { vendor: 'Linear', spend: 17300 },
  { vendor: 'Notion', spend: 15100 },
  { vendor: 'Zapier', spend: 12900 },
].sort((a, b) => a.spend - b.spend);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {payload[0].payload.vendor}
            </span>
            <span className="font-bold" style={{ color: payload[0].fill }}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payload[0].value)}
            </span>
          </div>
      </div>
    );
  }

  return null;
};

const VendorSpendChart: React.FC = () => {
  return (
    <>
      <h3 className="font-semibold text-base">Spend by Vendor (Top 10)</h3>
      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
            <YAxis type="category" dataKey="vendor" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={100} tick={{ dx: -5 }} />
            <Tooltip
              cursor={{ fill: 'hsl(var(--accent))' }}
              content={<CustomTooltip />}
            />
            <Bar dataKey="spend" fill="#8884d8" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default VendorSpendChart;
