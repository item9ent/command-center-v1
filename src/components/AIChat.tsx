"use client";

import { useChat } from '@ai-sdk/react';
import { Send, Sparkles, User, Loader2, Bot, Wrench } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export function AIChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] border border-accent-color/30 rounded-xl overflow-hidden bg-background shadow-lg">
      {/* Header */}
      <div className="bg-accent-color/10 p-4 border-b border-accent-color/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-color" />
          <h3 className="font-semibold text-accent-color">ENHAZED AI Assistant</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-subtle font-medium bg-black/5 dark:bg-white/5 px-2 py-1 rounded-full border border-border-color">
          <span className="w-1.5 h-1.5 rounded-full bg-success-color animate-pulse"></span>
          Connected to Database
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {error && (
          <div className="p-4 mb-4 bg-danger-color/10 border border-danger-color/50 rounded-lg text-danger-color text-sm">
            <strong>Error:</strong> {error.message || 'Something went wrong.'}
          </div>
        )}
        
        {(!messages || messages.length === 0) && !error && (
          <div className="h-full flex flex-col items-center justify-center text-center text-subtle p-6">
            <Sparkles className="w-12 h-12 mb-3 text-accent-color/30" />
            <p className="mb-2">Hi, I'm ENHAZED AI.</p>
            <p className="text-xs">I am directly connected to your operational database. Ask me things like:</p>
            <ul className="text-xs mt-3 space-y-1 italic text-accent-color/80">
              <li>"What is our total sales volume?"</li>
              <li>"Do we have any pending approvals?"</li>
              <li>"Check our current inventory levels."</li>
            </ul>
          </div>
        )}
        
        {messages && messages.map((m: any) => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role !== 'user' && (
              <div className="w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-accent-color" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              m.role === 'user' 
                ? 'bg-accent-color text-white rounded-tr-sm' 
                : 'bg-black/5 dark:bg-white/10 rounded-tl-sm text-sm leading-relaxed whitespace-pre-wrap'
            }`}>
              {/* Text content */}
              {m.content}

              {/* Tool Calls */}
              {m.toolInvocations?.map((toolInvocation: any) => {
                const toolCallId = toolInvocation.toolCallId;
                const isComplete = 'result' in toolInvocation;

                return (
                  <div key={toolCallId} className="mt-2 text-xs border border-border-color bg-black/5 dark:bg-white/5 rounded p-2 flex flex-col gap-1 text-subtle font-mono">
                    <div className="flex items-center gap-1 font-semibold text-accent-color">
                      <Wrench className="w-3 h-3" />
                      Executing: {toolInvocation.toolName}...
                    </div>
                    {isComplete ? (
                      <div className="text-success-color pl-4 border-l-2 border-success-color mt-1">
                        ✓ Data retrieved
                      </div>
                    ) : (
                      <div className="text-warning-color pl-4 border-l-2 border-warning-color mt-1 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Fetching from database...
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/20 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
          <div className="flex gap-3 justify-start">
             <div className="w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 text-accent-color animate-spin" />
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-black/5 dark:bg-white/5 border-t border-border-color">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 bg-transparent border border-border-color rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-color focus:border-transparent"
            value={input || ""}
            placeholder="Ask the AI something..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input || !input.trim()}
            className="w-10 h-10 rounded-full bg-accent-color text-white flex items-center justify-center hover:bg-accent-color/90 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4 -ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
