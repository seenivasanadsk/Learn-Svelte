<!-- src\routes\+layout.svelte -->
<script>
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div>
  <a href="/">home</a>
  <a href="/about/234" data-sveltekit-preload-code="viewport">about 234</a>
</div>

{@render children()}
