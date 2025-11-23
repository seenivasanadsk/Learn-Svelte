<script>
	import { data } from './shared.svelte';
	const { data: tee } = $props();
</script>

<p>From child {data.count},, {tee}</p>
<button onclick={() => data.count++}>add</button>
