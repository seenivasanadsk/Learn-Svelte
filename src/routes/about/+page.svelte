<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { invalidate } from '$app/navigation';

  export let data; // load() data automatically injected
  console.log(data);

  onMount(() => {
    const interval = setInterval(() => {
      invalidate($page.url.pathname); // refresh current page load
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div>
  <h1>This is about page</h1>
  <h2>{new Date().toLocaleString()}</h2>
</div>
