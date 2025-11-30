<!-- src\routes\+layout.svelte -->
<script>
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { preloadCode, preloadData } from '$app/navigation';
  import { onMount } from 'svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div data-sveltekit-reload>
  <a href="/">home</a>
</div>

{@render children()}
