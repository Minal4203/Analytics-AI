import React from 'react';
import { FileDown, Calendar } from 'lucide-react';
import OverviewCards from '../components/dashboard/OverviewCards';
import { Button } from '../components/ui/button';
import InvoiceTrendChart from '../components/dashboard/InvoiceTrendChart';
import VendorSpendChart from '../components/dashboard/VendorSpendChart';
import InvoicesTable from '../components/dashboard/InvoicesTable';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            Jan 1, 2025 - Jan 31, 2025
          </Button>
          <Button className="h-9">
            <FileDown className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>
      <OverviewCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <div className="col-span-4 p-4 border rounded-lg bg-card">
          <InvoiceTrendChart />
        </div>
        <div className="col-span-3 p-4 border rounded-lg bg-card">
          <VendorSpendChart />
        </div>
      </div>
      <div className="mt-6">
        <InvoicesTable />
      </div>
    </div>
  );
};

export default DashboardPage;
