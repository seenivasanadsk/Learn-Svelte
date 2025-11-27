export const data = $state({
  count: 0
});

import { writable } from 'svelte/store';
export const count = writable(0);
