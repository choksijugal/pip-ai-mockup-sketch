
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User, Send, Plus, FileText, PaperclipIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export function AIAssistantWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello Sarah! How can I help you with month-end closing today?',
      sender: 'ai',
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: 'Just now',
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've prepared the accrual journal entries for review. Based on historical patterns, I estimate $42,500 in revenue accruals and $28,300 in expense accruals for this month. Would you like me to create the draft entries for your approval?",
        sender: 'ai',
        timestamp: 'Just now',
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-primary/20">
                <AvatarFallback>
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <CardTitle>AI Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsFullScreen(true)}>
              Expand
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-[220px] overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
              <div className="relative flex-1">
                <Textarea
                  placeholder="Ask the AI assistant..."
                  className="min-h-[40px] resize-none pr-12"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyPress}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1" 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Documents</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <PaperclipIcon className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Attach</span>
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">AI is up to date</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogContent className="sm:max-w-[600px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>AI Assistant</DialogTitle>
            <DialogDescription>
              Your personal financial close companion
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col">
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[90%] ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {message.timestamp}
                  </span>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[60px] resize-none pr-12"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyPress}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 bottom-2" 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
              <Button variant="outline" size="sm">
                <PaperclipIcon className="h-4 w-4 mr-2" />
                Attach Files
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
