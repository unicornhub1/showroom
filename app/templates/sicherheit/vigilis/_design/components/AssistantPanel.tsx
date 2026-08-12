'use client';

import { Sparkles, Send, Info } from 'lucide-react';
import { ASSISTANT_MESSAGES } from '../data';

/**
 * KI-Assistent — Demonstrationsansicht.
 * Die Eingabe ist bewusst deaktiviert, der Verlauf zeigt einen Beispieldialog.
 */
export function AssistantPanel() {
  return (
    <div
      style={{
        backgroundColor: 'var(--vg-surface)',
        border: '1px solid var(--vg-border)',
      }}
    >
      {/* Kopfzeile */}
      <div
        className="flex items-center justify-between border-b px-6 py-4"
        style={{ borderColor: 'var(--vg-border)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center"
            style={{
              backgroundColor: 'var(--vg-signal-glow)',
              border: '1px solid var(--vg-signal)',
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: 'var(--vg-signal)' }} />
          </span>
          <div>
            <p
              className="text-[13px] tracking-[0.04em]"
              style={{
                color: 'var(--vg-text)',
                fontFamily: 'var(--vg-font-display)',
                fontWeight: 600,
              }}
            >
              KI-Sicherheitsassistent
            </p>
            <p
              className="mt-0.5 text-[10px] tracking-[0.16em] uppercase"
              style={{
                color: 'var(--vg-text-dim)',
                fontFamily: 'var(--vg-font-mono)',
              }}
            >
              Bedarfsanalyse im Dialog
            </p>
          </div>
        </div>

        <span
          className="hidden items-center gap-2 px-3 py-1.5 sm:flex"
          style={{
            border: '1px solid var(--vg-border-light)',
            backgroundColor: 'var(--vg-bg)',
          }}
        >
          <span
            className="vg-pulse inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: 'var(--vg-warn)' }}
          />
          <span
            className="text-[10px] tracking-[0.16em] uppercase"
            style={{
              color: 'var(--vg-text-muted)',
              fontFamily: 'var(--vg-font-mono)',
            }}
          >
            Beta
          </span>
        </span>
      </div>

      {/* Verlauf */}
      <div className="flex flex-col gap-5 px-6 py-7">
        {ASSISTANT_MESSAGES.map((msg, i) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={i}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[78%] px-5 py-4 text-[14px] leading-relaxed"
                style={{
                  backgroundColor: isUser ? 'var(--vg-elevated)' : 'var(--vg-bg)',
                  border: `1px solid ${
                    isUser ? 'var(--vg-border-light)' : 'var(--vg-border)'
                  }`,
                  borderLeft: isUser
                    ? '1px solid var(--vg-border-light)'
                    : '2px solid var(--vg-signal)',
                  color: isUser ? 'var(--vg-text)' : 'var(--vg-text-muted)',
                }}
              >
                {!isUser && (
                  <span
                    className="mb-2 block text-[9px] tracking-[0.2em] uppercase"
                    style={{
                      color: 'var(--vg-signal)',
                      fontFamily: 'var(--vg-font-mono)',
                    }}
                  >
                    Assistent
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Eingabe (deaktiviert) */}
      <div className="border-t px-6 py-5" style={{ borderColor: 'var(--vg-border)' }}>
        <div
          className="flex items-center gap-3 px-4 py-3.5"
          style={{
            backgroundColor: 'var(--vg-bg)',
            border: '1px solid var(--vg-border)',
          }}
        >
          <input
            type="text"
            disabled
            placeholder="Beschreiben Sie Ihr Objekt …"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--vg-text)' }}
          />
          <button
            disabled
            className="flex h-9 w-9 items-center justify-center opacity-40"
            style={{ backgroundColor: 'var(--vg-signal)', color: '#fff' }}
            aria-label="Senden"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-start gap-2">
          <Info
            className="mt-px h-3.5 w-3.5 shrink-0"
            style={{ color: 'var(--vg-text-dim)' }}
          />
          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--vg-text-dim)' }}>
            Der KI-Assistent wird derzeit optimiert und steht in Kürze zur
            Verfügung. Nutzen Sie solange den Konfigurator oder rufen Sie uns an.
          </p>
        </div>
      </div>
    </div>
  );
}
