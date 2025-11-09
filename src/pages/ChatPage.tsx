import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';
import ChatMessage from '../components/chat/ChatMessage';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const initialMessages: ChatMessageType[] = [
    {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm here to help you analyze your invoice data. What would you like to know?",
    }
];

const mockResponse: ChatMessageType = {
    id: '',
    role: 'assistant',
    content: "The total spend in the last 90 days is $152,430.",
    sql: "SELECT SUM(amount) AS total_spend\nFROM invoices\nWHERE date >= CURRENT_DATE - INTERVAL '90 days';",
    result: [
        { total_spend: 152430 }
    ]
};

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate API call and AI response
    setTimeout(() => {
      const aiResponse = { ...mockResponse, id: (Date.now() + 1).toString() };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiResponse]);
    }, 2000);
  };

  return (
    <div className="flex h-full flex-col">
       <header className="border-b p-4">
        <h2 className="text-xl font-bold tracking-tight">Chat with Data</h2>
      </header>
      <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto p-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isTyping && <ChatMessage message={{ id: 'typing', role: 'assistant', content: '', isTyping: true }} />}
      </div>
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your data..."
            className="pr-12"
            autoFocus
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
