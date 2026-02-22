/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { generateRandomName, generateId } from './utils';
import { Send, User, MessageSquare } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  color: string;
}

interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
  color: string;
}

const COLORS = [
  'text-red-500', 'text-orange-500', 'text-amber-500', 'text-yellow-500', 
  'text-lime-500', 'text-green-500', 'text-emerald-500', 'text-teal-500', 
  'text-cyan-500', 'text-sky-500', 'text-blue-500', 'text-indigo-500', 
  'text-violet-500', 'text-purple-500', 'text-fuchsia-500', 'text-pink-500', 
  'text-rose-500'
];

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize user
  useEffect(() => {
    const storedUser = sessionStorage.getItem('chat_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const newUser = {
        id: generateId(),
        name: generateRandomName(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      };
      sessionStorage.setItem('chat_user', JSON.stringify(newUser));
      setUser(newUser);
    }
  }, []);

  // Connect to WebSocket
  useEffect(() => {
    if (!user) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [user]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || !user || !wsRef.current) return;

    const message: Message = {
      id: generateId(),
      userId: user.id,
      username: user.name,
      text: inputText.trim(),
      timestamp: Date.now(),
      color: user.color
    };

    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
      setInputText('');
    }
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen bg-slate-50">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-slate-800 text-lg">Instant Chat</h1>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`} />
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            <span className={`text-sm font-medium ${user.color}`}>{user.name}</span>
            <span className="text-xs text-slate-400 font-mono">#{user.id}</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 opacity-50">
            <MessageSquare className="w-12 h-12" />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.userId === user.id;
            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`flex items-baseline gap-2 mb-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className={`text-xs font-medium ${msg.color}`}>{msg.username}</span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                    isMe 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-slate-200 p-4">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            autoFocus
          />
          <button
            type="submit"
            disabled={!inputText.trim() || !isConnected}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </footer>
    </div>
  );
}

