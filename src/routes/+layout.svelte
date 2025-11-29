<!-- src\routes\+layout.svelte -->
<script>
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { preloadCode, preloadData } from '$app/navigation';
  import { onMount } from 'svelte';

  let { children } = $props();

  onMount(() => {
    console.log('hisdf');
    preloadCode('/about/234');
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div data-sveltekit-reload>
  <a href="/">home</a>
  <a href="/about/234" data-sveltekit-preload-code="viewport">about 234</a>
</div>

{@render children()}
