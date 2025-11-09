import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DollarSign, Receipt, UploadCloud, PieChart, ArrowUp } from 'lucide-react';

const overviewData = [
  {
    title: 'Total Spend (YTD)',
    value: '$489.3k',
    change: '+12.5%',
    icon: DollarSign,
  },
  {
    title: 'Total Invoices Processed',
    value: '1,204',
    change: '+8.2%',
    icon: Receipt,
  },
  {
    title: 'Documents Uploaded',
    value: '316',
    change: '+22.1%',
    icon: UploadCloud,
  },
  {
    title: 'Average Invoice Value',
    value: '$406.40',
    change: '-1.8%',
    icon: PieChart,
  },
];

const OverviewCards: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className={`h-3 w-3 mr-1 ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
              <span className={item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{item.change}</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCards;
