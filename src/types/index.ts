export interface MonthlyTrend {
  month: string;
  volume: number;
  value: number;
}

export interface VendorSpend {
  vendor: string;
  spend: number;
}

export interface Invoice {
  id: string;
  vendor: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sql?: string;
  result?: Record<string, any>[];
  isTyping?: boolean;
}
