import { writable } from 'svelte/store';

export const LIGHT = 'LIGHT';
export const DARK = 'DARK';
export const SYSTEM = 'SYSTEM';

/* ---------------------------------------
   Helpers
--------------------------------------- */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
}

function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === DARK) {
    root.classList.add('dark');
  } else if (theme === LIGHT) {
    root.classList.remove('dark');
  } else {
    // SYSTEM
    applyTheme(getSystemTheme());
  }
}

/* ---------------------------------------
   Store
--------------------------------------- */
function createTheme() {
  const { subscribe, set, update } = writable(LIGHT);

  if (typeof window !== 'undefined') {
    // react to system theme changes
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', () => {
      update((t) => {
        if (t === SYSTEM) applyTheme(SYSTEM);
        return t;
      });
    });
  }

  return {
    subscribe,

    set(theme) {
      applyTheme(theme);
      set(theme);
    },

    toggle() {
      update((t) => {
        const next = t === LIGHT ? DARK : t === DARK ? SYSTEM : LIGHT;

        applyTheme(next);
        return next;
      });
    }
  };
}

export const theme = createTheme();
