<!-- src\routes\+layout.svelte -->
<script>
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();

  function handleGlobalShortcutKey(e) {
    const { altKey, ctrlKey, shiftKey, metaKey, key } = e;
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onkeydown={handleGlobalShortcutKey} />

<div class="h-dvh">
  {@render children()}
</div>
