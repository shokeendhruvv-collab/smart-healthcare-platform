import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Trash2, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  CornerDownLeft, 
  RotateCcw,
  Check,
  User,
  HeartPulse
} from 'lucide-react';
import { ChatMessage } from '../types';
import { generateHealthCopilotResponse } from '../data/aiResponses';

interface AICopilotProps {
  patientName?: string;
  onNavigateToRecords?: () => void;
  onNavigateToMedicines?: () => void;
  onCallEmergency?: () => void;
  externalQuery?: string;
  onClearExternalQuery?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'ai',
    text: `Hello Harshit! I am your LifeCare AI Health Copilot. 👋\n\nI can help you review your recent lab reports, explain your prescribed medications, analyze your vitals, or suggest questions for your next appointment with Dr. Priya Sharma. How can I assist you today?`,
    timestamp: 'Just now',
    suggestedActions: [
      'Explain my lab report',
      'Is this medicine safe?',
      'What should I eat for better health?',
      'My health summary',
    ],
    disclaimer: true,
  },
];

export const AICopilot: React.FC<AICopilotProps> = ({
  patientName = 'Harshit',
  onNavigateToRecords,
  onNavigateToMedicines,
  onCallEmergency,
  externalQuery,
  onClearExternalQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('lifecare_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to local state
  useEffect(() => {
    localStorage.setItem('lifecare_chat_history', JSON.stringify(messages));
  }, [messages]);

  // Handle external queries passed from hero or search
  useEffect(() => {
    if (externalQuery && externalQuery.trim()) {
      handleSendMessage(externalQuery.trim());
      if (onClearExternalQuery) onClearExternalQuery();
    }
  }, [externalQuery]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Realistic processing delay for medical analysis
    setTimeout(() => {
      const outcome = generateHealthCopilotResponse(query, patientName);
      
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: outcome.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: outcome.suggestedActions,
        disclaimer: true,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 850);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('lifecare_chat_history');
  };

  const handleActionClick = (action: string) => {
    if (action.includes('112') || action.toLowerCase().includes('emergency')) {
      onCallEmergency?.();
      return;
    }
    if (action.includes('Record') || action.includes('Lab')) {
      onNavigateToRecords?.();
      return;
    }
    if (action.includes('Prescription') || action.includes('Refill')) {
      onNavigateToMedicines?.();
      return;
    }
    handleSendMessage(action);
  };

  const suggestedQuestions = [
    'Explain my lab report',
    'Is this medicine safe?',
    'What should I eat for better health?',
    'My health summary',
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col h-[520px] transition-all overflow-hidden">
      
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-white via-slate-50/50 to-blue-50/30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#102A43] tracking-tight">
                AI Health Copilot
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium line-clamp-1">
              Ask anything about your health, reports, medicines and get instant, personalized answers.
            </p>
          </div>
        </div>

        {/* Clear chat button */}
        <button
          onClick={handleClearChat}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          title="Clear conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
          Suggested:
        </span>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSendMessage(q)}
            className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#0878E8] hover:border-[#0878E8]/40 hover:bg-blue-50/30 transition-all cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-[#EAF6FF] border border-blue-200 text-[#0878E8] flex items-center justify-center shrink-0 self-start shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[78%] space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
                
                {/* Message Bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs whitespace-pre-line ${
                    isUser
                      ? 'bg-[#0878E8] text-white rounded-tr-none'
                      : 'bg-slate-100 text-[#102A43] rounded-tl-none border border-slate-200/70'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Suggested Action Chips (if returned by AI) */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => handleActionClick(action)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          action.includes('112') || action.toLowerCase().includes('emergency')
                            ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                            : 'bg-white text-[#0878E8] border border-blue-200 hover:bg-[#EAF6FF]'
                        }`}
                      >
                        {action} →
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp & Safety Note */}
                <div className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.disclaimer && (
                    <span className="flex items-center gap-1 text-slate-400">
                      <ShieldCheck className="w-3 h-3 text-[#20B26B]" />
                      <span>Not a definitive diagnosis</span>
                    </span>
                  )}
                </div>

              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 self-start">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-xl bg-[#EAF6FF] text-[#0878E8] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-100 p-3.5 rounded-2xl rounded-tl-none border border-slate-200/70 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0878E8] animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-[#0878E8] animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-[#0878E8] animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-xs text-slate-500 font-medium ml-1">Analyzing medical knowledge...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your health question..."
            disabled={isLoading}
            className="w-full text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-[#0878E8] rounded-xl pl-4 pr-12 py-3 outline-hidden transition-all text-slate-800 placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 w-9 h-9 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] disabled:bg-slate-200 text-white disabled:text-slate-400 flex items-center justify-center transition-all cursor-pointer shadow-xs disabled:cursor-not-allowed"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        
        {/* Medical disclaimer footer */}
        <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-slate-400 text-center">
          <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
          <span>For acute severe emergencies, please immediately dial 112 or visit Emergency Trauma.</span>
        </div>
      </div>

    </div>
  );
};
