<script>
  import { setContext } from 'svelte';
  import Test2 from './Test2.svelte';

  let count = $state(0);

  // Pass a *reactive object* via context
  const context = $state({ count });
  setContext('myContext', context);

  function increment() {
    context.count++; // update through context object
  }
</script>

<button onclick={increment}>Increment Parent ({context.count})</button>

<Test2 />
