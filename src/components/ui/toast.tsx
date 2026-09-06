'use client';

import * as React from 'react';
import { IconCheck, IconAlertTriangle, IconInfoCircle, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'warning' | 'error' | 'info';
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const showToast = React.useCallback(
    ({ title, description, type = 'info' }: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Floating Toast Pill Container */}
      <div className="fixed top-4 inset-x-0 z-50 flex flex-col items-center gap-2 pointer-events-none px-4 max-w-md mx-auto">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-center justify-between gap-3 w-full p-3.5 rounded-xl border bg-surface/95 backdrop-blur-md shadow-2xl animate-in slide-in-from-top duration-200 select-none',
              toast.type === 'success' && 'border-emerald-500/40 text-emerald-300',
              toast.type === 'warning' && 'border-amber-500/40 text-amber-300',
              toast.type === 'error' && 'border-red-500/40 text-red-300',
              toast.type === 'info' && 'border-sky-500/40 text-sky-300'
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === 'success' && <IconCheck size={18} className="shrink-0 text-emerald-400" />}
              {toast.type === 'warning' && <IconAlertTriangle size={18} className="shrink-0 text-amber-400" />}
              {toast.type === 'error' && <IconAlertTriangle size={18} className="shrink-0 text-red-400" />}
              {toast.type === 'info' && <IconInfoCircle size={18} className="shrink-0 text-sky-400" />}

              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-foreground leading-tight truncate">
                  {toast.title}
                </span>
                {toast.description && (
                  <span className="text-[11px] text-muted-foreground leading-tight truncate">
                    {toast.description}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="touch-target h-7 w-7 rounded-full text-muted-foreground hover:text-foreground inline-flex items-center justify-center shrink-0"
            >
              <IconX size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
