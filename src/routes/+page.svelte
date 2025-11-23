<script>
	import { data } from './shared.svelte';
	import Test from './Test.svelte';
	let numbers = $state([1, 2]);

	function addNumber() {
		numbers.push(2);
	}
</script>

<p>{numbers}</p>

<button onclick={addNumber}> Add a number </button>

<p>From pareant {data.count}</p>
<button onclick={() => data.count++}>add</button>

<Test data={numbers} />
