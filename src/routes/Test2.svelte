<script>
  import { getContext } from 'svelte';

  const context = getContext('myContext');
</script>

<p>Child shows count: {context.count}</p>
