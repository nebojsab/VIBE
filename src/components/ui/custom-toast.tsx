"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { XIcon } from "lucide-react";

type ToastVariant = "default" | "success" | "info" | "error";

type ToastOptions = {
    title: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
};

type Toast = ToastOptions & {
    id: number;
};

type ToastContextValue = {
    showToast: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Debug: confirm provider mounted
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.log("[ToastProvider] Mounted on client");
        }
    }, []);

    const showToast = useCallback((options: ToastOptions) => {
        const id = Date.now();
        const duration = options.duration ?? 4000;

        // Debug: confirm toast calls reach the provider
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.log("[ToastProvider] showToast", { id, ...options });
        }

        setToasts((current) => [
            ...current,
            {
                id,
                variant: options.variant ?? "default",
                ...options,
            },
        ]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts((current) => current.filter((toast) => toast.id !== id));
            }, duration);
        }
    }, []);

    const dismiss = (id: number) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {mounted && (
                <div
                    className="pointer-events-none fixed inset-x-0 top-3 z-[9999] flex justify-end px-4"
                    data-custom-toast-container
                >
                    <div className="flex w-full max-w-sm flex-col gap-2">
                        {toasts.map((toast) => (
                            <div
                                key={toast.id}
                                data-custom-toast
                                className="pointer-events-auto overflow-hidden rounded-md border border-border bg-popover/95 text-popover-foreground shadow-lg backdrop-blur-sm"
                            >
                                <div className="flex items-start gap-3 px-4 py-3">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            {toast.title}
                                        </p>
                                        {toast.description ? (
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {toast.description}
                                            </p>
                                        ) : null}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => dismiss(toast.id)}
                                        className="text-muted-foreground hover:text-foreground inline-flex h-5 w-5 items-center justify-center rounded-md border border-transparent text-xs transition-colors"
                                    >
                                        <XIcon className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
  // Fallback no-op implementation for cases where the provider
  // has not mounted yet (e.g. during SSR or in isolated tests).
  if (!ctx) {
    return {
      showToast: () => {},
    };
  }
  return ctx;
}

