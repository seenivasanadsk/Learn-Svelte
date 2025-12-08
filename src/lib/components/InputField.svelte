<script>
  import { Sun, Moon } from 'lucide-svelte';
  import cn from '$lib/utils/cn';

  // -------------------------------------
  // Props
  // -------------------------------------
  let {
    children,
    href = '',
    onClick = () => {},
    onPrefixClick = () => {},
    onSuffixClick = () => {},
    prefix = null,
    suffix = null,
    class: userClass = '',
    ...props
  } = $props();
</script>

<button onclick={() => (hasError = !hasError)}>{hasError ? 'Error' : 'No Error'}</button>
<div
  class="group inline-flex items-center border-2 border-gray-300 rounded-md font-semibold relative focus-within:border-amber-500"
  use:errorStyle
>
  <span class="p-1 border-r-2 border-gray-300 group-focus-within:border-amber-500">
    <Sun class="text-gray-500 inline-block group-focus-within:text-amber-500" />
  </span>

  <input type="text" class="outline-none py-1 px-2" />

  <span class="p-1 border-l-2 border-gray-300 group-focus-within:border-amber-500">
    <Moon class="text-gray-500 inline-block group-focus-within:text-amber-500" />
  </span>

  <div
    class="absolute top-full h-50 overflow-auto left-0 w-full border-amber-500 border-2 rounded-b-md"
  >
    {#each Array(50) as _, i}
      <div class="bg-white not-last:border-b border-amber-500 p-1">option {i + 1}</div>
    {/each}
  </div>
</div>
