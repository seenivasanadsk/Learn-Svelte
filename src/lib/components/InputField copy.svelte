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
    color = 'accent',
    size = 'md',
    radius = '',
    prefix = null,
    suffix = null,
    class: userClass = '',
    ...props
  } = $props();

  // -------------------------------------
  // Styles
  // -------------------------------------
  const colorStyles = {
    primary: 'focus-within:border-blue-500',
    success: 'focus-within:border-green-500',
    danger: 'focus-within:border-red-500',
    accent: 'focus-within:border-amber-500'
  };

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  const radiusStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  const baseClass =
    'group inline-flex items-center border-2 border-gray-300 rounded-md font-semibold relative';

  // -------------------------------------
  // Derived values
  // -------------------------------------
  const className = $derived(
    cn(baseClass, colorStyles[color], sizeStyles[size], radiusStyles[radius || size], userClass)
  );

  const iconSize = $derived(size === 'sm' ? 15 : size === 'md' ? 20 : size === 'lg' ? 25 : 20);

  // Margin spacing based on size
  const prefixClass = $derived(
    cn(
      size === 'sm' ? 'mr-1' : size === 'md' ? 'mr-2' : size === 'lg' ? 'mr-3' : 'mr-2',
      'inline-block'
    )
  );

  const suffixClass = $derived(
    cn(
      size === 'sm' ? 'ml-1' : size === 'md' ? 'ml-2' : size === 'lg' ? 'ml-3' : 'ml-2',
      'inline-block'
    )
  );
</script>

<div class={className}>
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
      <div class="bg-amber-50 not-last:border-b border-amber-500 p-1">option {i + 1}</div>
    {/each}
  </div>
</div>
