<!-- src\routes\+layout.svelte -->
<script>
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { keyboardEventBus } from '$lib/utils/eventBus';
  import { theme } from '$lib/stores/theme';

  let { children } = $props();

  keyboardEventBus.on('Alt+D', theme.toggle);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="h-dvh">
  {@render children()}
</div>
