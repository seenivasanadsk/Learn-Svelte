import { invalidate } from '$app/navigation';

let source;

export function startSSE() {
  if (source) return;

  source = new EventSource('/api/events');

  source.onopen = () => {
    console.log('SSE connection succesfull')
  }

  source.onmessage = (e) => {
    console.log(e)
    const event = JSON.parse(e.data);
    invalidate(event.type);
  };

  source.onerror = () => {
    console.warn('SSE connection lost');
  };
}

export function stopSSE() {
  source?.close();
  source = null;
}
