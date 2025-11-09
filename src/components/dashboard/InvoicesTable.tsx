import React, { useState, useMemo } from 'react';
import { faker } from '@faker-js/faker';
import { ArrowUpDown, Search } from 'lucide-react';
import { Invoice } from '../../types';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

// Generate mock data
const generateMockInvoices = (count: number): Invoice[] => {
  const invoices: Invoice[] = [];
  for (let i = 0; i < count; i++) {
    invoices.push({
      id: faker.string.uuid(),
      vendor: faker.company.name(),
      invoiceNumber: `INV-${faker.string.numeric(6)}`,
      date: faker.date.past({ years: 1 }).toISOString(),
      amount: parseFloat(faker.finance.amount(50, 2000)),
      status: faker.helpers.arrayElement(['Paid', 'Pending', 'Overdue']),
    });
  }
  return invoices;
};

const mockInvoices = generateMockInvoices(50);

type SortKey = keyof Invoice;
type SortDirection = 'asc' | 'desc';

const InvoicesTable: React.FC = () => {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>({ key: 'date', direction: 'desc' });

  const sortedAndFilteredInvoices = useMemo(() => {
    let filtered = invoices.filter((invoice) =>
      invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filtered;
  }, [invoices, searchTerm, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusClass = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500/20 text-green-400';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Overdue':
        return 'bg-red-500/20 text-red-400';
      default:
        return '';
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
            <h3 className="font-semibold text-lg">Invoices</h3>
            <p className="text-sm text-muted-foreground">A list of recent invoices.</p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by vendor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Invoice #</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('date')}>
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => requestSort('amount')}>
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.vendor}</TableCell>
                <TableCell className="text-muted-foreground">{invoice.invoiceNumber}</TableCell>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.amount)}
                </TableCell>
                <TableCell className="text-center">
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusClass(invoice.status))}>
                    {invoice.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoicesTable;
