'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type QuickQuestion = {
  id: string;
  text: string;
  used?: boolean;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [quickQuestions, setQuickQuestions] = useState<QuickQuestion[]>([]);
  const [showPrompts, setShowPrompts] = useState(true);
  const [charCount, setCharCount] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();

  const maxChars = 500;

  // Load quick questions from Supabase
  useEffect(() => {
    const loadQuickQuestions = async () => {
      const { data, error } = await supabase
        .from('chat_settings')
        .select('value')
        .eq('key', 'quick_questions')
        .single();
      
      if (!error && data) {
        const questions = JSON.parse(data.value).map((text: string, index: number) => ({
          id: index.toString(),
          text,
          used: false
        }));
        setQuickQuestions(questions);
      } else {
        // Fallback questions
        setQuickQuestions([
          { id: '1', text: 'What services do you offer?' },
          { id: '2', text: 'How can you help with digital transformation?' },
          { id: '3', text: 'What industries do you specialize in?' },
          { id: '4', text: 'Tell me about your software engineering services' },
        ]);
      }
    };
    
    loadQuickQuestions();
  }, [supabase]);

  // Load conversation from session storage
  useEffect(() => {
    const savedSessionId = sessionStorage.getItem('chat_session_id');
    const savedMessages = sessionStorage.getItem('chat_messages');
    
    if (savedSessionId) setSessionId(savedSessionId);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {
        console.error('Failed to parse saved messages', e);
      }
    }
  }, []);

  // Save messages to session storage
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setCharCount(0);
    setIsLoading(true);

    // Mark quick question as used if applicable
    setQuickQuestions(prev => 
      prev.map(q => q.text === messageText.trim() ? { ...q, used: true } : q)
    );

    // Get conversation history for context
    const history = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText.trim(),
          history,
          sessionId
        }),
      });

      const data = await response.json();
      
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
        sessionStorage.setItem('chat_session_id', data.sessionId);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "I'm sorry, I couldn't process that. Please try again.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting. Please try again or contact us directly at hello@otaksi.ae",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setInputValue(value);
      setCharCount(value.length);
    }
  };

  const handleDownload = () => {
    const conversationText = messages.map(m => 
      `${m.role === 'user' ? 'You' : 'Otaksi Assistant'} (${m.timestamp.toLocaleTimeString()}):\n${m.content}`
    ).join('\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-conversation-${new Date().toISOString().slice(0, 19)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to clear the conversation?')) {
      setMessages([]);
      sessionStorage.removeItem('chat_messages');
      setSessionId(null);
      sessionStorage.removeItem('chat_session_id');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full animate-ping opacity-40" />
        <div className="relative w-14 h-14 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`fixed z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden ${
          isMaximized 
            ? 'inset-4 md:inset-8' 
            : 'bottom-6 right-6 w-[380px] h-[600px]'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Otaksi Assistant</h3>
              <span className="text-xs text-white/70">Online</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleDownload}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Download conversation"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title={isMaximized ? 'Minimize' : 'Maximize'}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMaximized ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                )}
              </svg>
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Clear conversation"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm max-w-[85%]">
                <p className="text-gray-800 text-sm leading-relaxed">
                  Hello! I'm the Otaksi Connect AI assistant. 👋<br /><br />
                  I can help you learn about our software engineering services, digital transformation solutions, and answer any questions you might have about how we can help your business grow.
                </p>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user'
                  ? 'bg-gray-200'
                  : 'bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF]'
              }`}>
                {message.role === 'user' ? (
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )}
              </div>
              <div className={`${
                message.role === 'user'
                  ? 'bg-[#5B6CFF] text-white rounded-2xl rounded-tr-md'
                  : 'bg-white text-gray-800 rounded-2xl rounded-tl-md'
              } p-3 shadow-sm max-w-[85%]`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <span className={`text-[10px] mt-1 block ${
                  message.role === 'user' ? 'text-white/50' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {quickQuestions.length > 0 && (
          <div className="border-t border-gray-100 bg-white">
            <button
              onClick={() => setShowPrompts(!showPrompts)}
              className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className={`w-4 h-4 transition-transform ${showPrompts ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span>Quick Questions</span>
              </div>
              <span className="text-xs text-gray-400">Click to expand</span>
            </button>
            
            <AnimatePresence>
              {showPrompts && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden px-4 pb-3"
                >
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.filter(q => !q.used).slice(0, 6).map((question) => (
                      <button
                        key={question.id}
                        onClick={() => handleQuickQuestion(question.text)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors"
                      >
                        {question.text}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-100 bg-white p-4">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B6CFF] focus:ring-2 focus:ring-[#5B6CFF]/20 transition-all resize-none text-gray-900 placeholder-gray-400 text-sm"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '100px' }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-[#FF2E9F] to-[#5B6CFF] text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-sm font-medium">Send</span>
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">{charCount}/{maxChars}</span>
            <span className="text-xs text-gray-400">Powered by Otaksi AI</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}