import { useSyncExternalStore } from 'react';

// src/stores/toastStore.ts
var DEFAULT_DURATION = 5e3;
var items = [];
var seq = 0;
var listeners = /* @__PURE__ */ new Set();
var timers = /* @__PURE__ */ new Map();
var emit = () => {
  for (const l of listeners) l();
};
var subscribe = (listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
var dismiss = (id) => {
  const timer = timers.get(id);
  if (timer) clearTimeout(timer);
  timers.delete(id);
  items = items.filter((t) => t.id !== id);
  emit();
};
var show = ({ tone = "info", message, title, durationMs }) => {
  seq += 1;
  const id = `sd-toast-${seq}`;
  const duration = durationMs ?? (tone === "danger" ? DEFAULT_DURATION * 1.5 : DEFAULT_DURATION);
  const item = { id, tone, message, durationMs: duration, ...title ? { title } : {} };
  items = [...items, item].slice(-4);
  if (duration > 0)
    timers.set(
      id,
      setTimeout(() => dismiss(id), duration)
    );
  emit();
  return id;
};
var toast = {
  show,
  success: (message, title) => show({ tone: "success", message, ...title ? { title } : {} }),
  error: (message, title) => show({ tone: "danger", message, ...title ? { title } : {} }),
  warning: (message, title) => show({ tone: "warning", message, ...title ? { title } : {} }),
  info: (message, title) => show({ tone: "info", message, ...title ? { title } : {} }),
  dismiss,
  clear() {
    for (const t of timers.values()) clearTimeout(t);
    timers.clear();
    items = [];
    emit();
  },
  getAll() {
    return items;
  },
  subscribe
};
var useToasts = () => useSyncExternalStore(
  subscribe,
  () => items,
  () => items
);

export { toast, useToasts };
