<!-- src\routes\+layout.svelte -->
<script>
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { onMount, onDestroy } from 'svelte';
  import { keyboardEventBus } from '$lib/utils/eventBus';
  import { theme } from '$lib/stores/theme';
  import Toast from '$lib/components/Toast.svelte';
  import { startSSE, stopSSE } from '$lib/core/client/sseReceiver';

  let { children } = $props();

  keyboardEventBus.on('Alt+D', theme.toggle);
  onMount(startSSE);
  onDestroy(stopSSE);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="h-dvh">
  {@render children()}
</div>
<Toast />
