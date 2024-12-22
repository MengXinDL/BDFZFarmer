import type { EventCallback, EventType } from '@/types/event';


let id = 0;
const events = new Map<EventType, [{
  id: number;
  listener: EventCallback;
}]>();

export function on(type: EventType, listener: EventCallback) {
  const listeners = events.get(type);
  if (listeners) {
    listeners.push({ id, listener });
  }
  else {
    events.set(type, [{ listener, id }]);
  }
  return id++;
}

export function off(id: number) {
  for (let listeners of events.values()) {
    const index = listeners.findIndex(listener => listener.id === id);
    if (index !== -1) {
      listeners.splice(index, 1);
      return;
    }
  }
}

