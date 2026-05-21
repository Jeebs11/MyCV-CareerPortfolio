import { useState, useRef, useEffect, useCallback } from 'react';

const INK = 'hsl(220,25%,14%)';
const PAPER = 'hsl(40,20%,97%)';
const BRASS = 'hsl(35,45%,45%)';
const BRASS_LIGHT = 'hsl(35,55%,62%)';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING = "Hi — I'm Mujeeb's AI assistant. Ask me about his experience.";

const CHIPS = [
  "Can Mujeeb help me?",
  "Tell me about Mujeeb",
  "What's the biggest programme Mujeeb has delivered?",
  "Has he worked in my industry?",
  "How has he helped fix broken delivery?",
];

function MLBadge({ onClick, hasNudge }: { onClick: () => void; hasNudge: boolean }) {
  return (
    <button
      onClick={onClick}
      data-testid="button-chat-toggle"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        width: 52,
        height: 52,
        borderRadius: 6,
        background: INK,
        border: `1.5px solid hsl(220,20%,26%)`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        boxShadow: '0 4px 24px rgba(0,0,0,0.28)',
        padding: 0,
        outline: 'none',
      }}
    >
      <span style={{
        position: 'absolute',
        inset: -3,
        borderRadius: 10,
        border: `1.5px solid ${BRASS}`,
        opacity: 0,
        animation: 'ml-breathe 4s ease-in-out infinite',
        pointerEvents: 'none',
        boxShadow: `0 0 8px 2px hsla(35,45%,45%,0.35)`,
      }} />
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="3" fill={BRASS} />
        <text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>ML</text>
      </svg>
      <style>{`
        @keyframes ml-breathe {
          0%, 100% { opacity: 0; box-shadow: 0 0 4px 1px hsla(35,45%,45%,0.15); }
          50%       { opacity: 0.7; box-shadow: 0 0 10px 3px hsla(35,45%,45%,0.4); }
        }
      `}</style>
    </button>
  );
}

function NudgeBubble({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 92,
        right: 28,
        background: INK,
        border: `1px solid hsl(220,20%,26%)`,
        borderRadius: 6,
        padding: '10px 14px',
        zIndex: 9998,
        maxWidth: 240,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      }}
      onClick={onDismiss}
      data-testid="chat-nudge"
    >
      <div style={{ fontSize: 12, color: PAPER, lineHeight: 1.5 }}>
        Ask me anything about Mujeeb's experience →
        <span style={{ display: 'inline-block', animation: 'blink 1.1s step-end infinite', marginLeft: 2, color: BRASS_LIGHT }}>|</span>
      </div>
      <div style={{
        position: 'absolute',
        bottom: -7,
        right: 22,
        width: 12,
        height: 12,
        background: INK,
        border: `1px solid hsl(220,20%,26%)`,
        transform: 'rotate(45deg)',
        borderTop: 'none',
        borderLeft: 'none',
      }} />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [sessionId] = useState(() => `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const transcriptSavedRef = useRef(false);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem('chatNudgeShown')) return;
    const timer = setTimeout(() => {
      setShowNudge(true);
      const autoHide = setTimeout(() => setShowNudge(false), 7000);
      return () => clearTimeout(autoHide);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismissNudge = useCallback(() => {
    setShowNudge(false);
    if (typeof window !== 'undefined') localStorage.setItem('chatNudgeShown', '1');
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    dismissNudge();
  }, [dismissNudge]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    saveTranscript();
  }, []);

  const saveTranscript = useCallback(() => {
    const msgs = messagesRef.current;
    if (transcriptSavedRef.current) return;
    if (msgs.length <= 1) return;
    transcriptSavedRef.current = true;
    fetch('/api/chat/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, messages: msgs }),
    }).catch(() => {});
  }, [sessionId]);

  useEffect(() => {
    return () => { saveTranscript(); };
  }, [saveTranscript]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMessage = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    transcriptSavedRef.current = false;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          for (const line of chunk.split('\n')) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantMessage += parsed.content;
                  setMessages(prev => {
                    const next = [...prev];
                    next[next.length - 1] = { role: 'assistant', content: assistantMessage };
                    return next;
                  });
                }
              } catch {}
            }
          }
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {showNudge && !isOpen && <NudgeBubble onDismiss={dismissNudge} />}
      <MLBadge onClick={isOpen ? closeChat : openChat} hasNudge={showNudge && !isOpen} />

      {isOpen && (
        <div
          data-testid="chat-window"
          style={{
            position: 'fixed',
            bottom: 92,
            right: 28,
            width: 360,
            height: 520,
            background: INK,
            border: `1px solid hsl(220,20%,24%)`,
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9998,
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            fontFamily: 'Inter, sans-serif',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid hsl(220,20%,22%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="3" fill={BRASS} />
                <text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>ML</text>
              </svg>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, fontWeight: 400, color: PAPER, lineHeight: 1.2 }} data-testid="text-chat-title">Ask about Mujeeb</div>
                <div style={{ fontSize: 10, color: 'hsl(220,15%,48%)', letterSpacing: '0.08em' }}>AI Assistant</div>
              </div>
            </div>
            <button onClick={closeChat} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(220,15%,48%)', fontSize: 18, lineHeight: 1, padding: '4px 6px' }} data-testid="button-chat-close">×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12 }} data-testid="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }} data-testid={`message-${msg.role}-${idx}`}>
                <div style={{
                  maxWidth: '80%',
                  padding: '9px 13px',
                  borderRadius: 4,
                  fontSize: 13,
                  lineHeight: 1.65,
                  background: msg.role === 'user' ? BRASS : 'hsl(220,20%,20%)',
                  color: msg.role === 'user' ? PAPER : 'hsl(220,15%,80%)',
                  border: msg.role === 'assistant' ? '1px solid hsl(220,20%,26%)' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', gap: 4, padding: '9px 13px', background: 'hsl(220,20%,20%)', border: '1px solid hsl(220,20%,26%)', borderRadius: 4, alignSelf: 'flex-start', width: 44 }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: BRASS_LIGHT, animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
            <style>{`@keyframes dot-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }`}</style>
          </div>

          {/* Chips — shown until user sends first message */}
          {messages.length === 1 && !isLoading && (
            <div style={{ padding: '0 16px 10px', display: 'flex', flexWrap: 'wrap', gap: 6, flexShrink: 0 }}>
              {CHIPS.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(chip)}
                  data-testid={`button-suggestion-${i}`}
                  style={{
                    background: 'hsl(220,20%,20%)',
                    border: `1px solid hsl(220,20%,28%)`,
                    borderRadius: 4,
                    padding: '5px 10px',
                    fontSize: 11,
                    color: 'hsl(220,15%,70%)',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.4,
                    textAlign: 'left',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 14px 14px', borderTop: '1px solid hsl(220,20%,22%)', display: 'flex', gap: 8, flexShrink: 0 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question…"
              disabled={isLoading}
              data-testid="input-chat-message"
              style={{
                flex: 1,
                padding: '8px 12px',
                background: 'hsl(220,20%,18%)',
                border: '1px solid hsl(220,20%,28%)',
                borderRadius: 4,
                color: PAPER,
                fontSize: 13,
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              data-testid="button-send-message"
              style={{
                padding: '8px 14px',
                background: input.trim() && !isLoading ? BRASS : 'hsl(220,20%,22%)',
                border: 'none',
                borderRadius: 4,
                color: input.trim() && !isLoading ? PAPER : 'hsl(220,15%,45%)',
                cursor: input.trim() && !isLoading ? 'pointer' : 'default',
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                transition: 'background 0.15s',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
