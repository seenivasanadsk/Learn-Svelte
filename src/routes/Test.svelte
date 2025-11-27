<script>
  import { count, data } from './shared.svelte';
  const { data: tee, monkey } = $props();
</script>

<div>
  <p>From child {data.count},, {tee}</p>
  <button onclick={() => data.count++}>add</button>
  <button>{$count}</button>
  {@render monkey('test', 'test123')}
</div>
