<script>
  import { enhance } from '$app/forms';
  let { data, form } = $props();
  let count = $state(0);
</script>

{#if form?.error}
  <p class="text-red-500">Error: {form.error}</p>
{/if}

<button onclick={() => count++}>click {count}</button>

<!-- <h1>about ({window.innerWidth} X {window.innerHeight})</h1> -->
<p>this is the about page.</p>
<div>
  {JSON.stringify(data)}
</div>

<form method="POST">
  <input type="text" name="field1" />
  <button>Submit</button>
</form>

<form method="POST" action="?/test" use:enhance>
  <input type="text" name="field2" />
  <button>Submit</button>
</form>
