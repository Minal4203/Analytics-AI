import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ChatMessage as ChatMessageType } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ResultTable: React.FC<{ data: Record<string, any>[] }> = ({ data }) => {
  if (!data || data.length === 0) return null;
  const headers = Object.keys(data[0]);

  return (
    <div className="mt-4 overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => (
                <TableCell key={header}>{String(row[header])}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  if (message.isTyping) {
    return (
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
          <Bot className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-2 pt-1.5">
            <span className="h-2 w-2 animate-[bounce_1s_infinite] rounded-full bg-muted-foreground"></span>
            <span className="h-2 w-2 animate-[bounce_1s_infinite_200ms] rounded-full bg-muted-foreground"></span>
            <span className="h-2 w-2 animate-[bounce_1s_infinite_400ms] rounded-full bg-muted-foreground"></span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-start gap-4', isUser && 'justify-end')}>
      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
          <Bot className="h-5 w-5" />
        </div>
      )}
      <div
        className={cn(
          'max-w-xl rounded-lg px-4 py-3',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary'
        )}
      >
        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
        {message.sql && (
          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground">Generated SQL</h4>
            <pre className="mt-1 overflow-x-auto rounded-md bg-background p-3 text-xs">
              <code>{message.sql}</code>
            </pre>
          </div>
        )}
        {message.result && <ResultTable data={message.result} />}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
