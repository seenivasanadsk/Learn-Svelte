// src\lib\core\client\sseReceiver.js

import { invalidate } from '$app/navigation';

let source;
let triggerables = new Set();

export function startSSE() {
  if (source) return;

  source = new EventSource('/api/events');

  source.onopen = () => {
    console.log('SSE connection succesfull')
  }

  source.onmessage = (e) => {
    const event = JSON.parse(e.data);
    console.log(event)
    if (triggerables.has(event.type))
      invalidate(event.type);
  };

  source.onerror = () => {
    console.warn('SSE connection lost');
  };
}

export function syncOn(type) {
  triggerables.add(type)
}

export function syncOff(type) {
  triggerables.delete(type)
}

export function stopSSE() {
  source?.close();
  source = null;
}
