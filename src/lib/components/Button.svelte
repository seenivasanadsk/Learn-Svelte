<script>
  import cn from '$lib/utils/cn';

  let {
    children = 'Button',
    href = '',
    onClick = () => {},
    color = 'dim',
    size = 'md',
    radius = 'md'
  } = $props();

  const colorStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700',
    accent: 'bg-amber-500 text-white hover:bg-amber-600 focus:bg-amber-600 active:bg-amber-700',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 active:bg-green-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 active:bg-red-700',
    dim: 'bg-gray-300 text-black hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-500'
  };

  const sizeStyle = {
    sm: 'px-1 py-0 text-sm',
    md: 'px-2 py-1 text-base',
    lg: 'px-3 py-2 text-xl'
  };

  const baseStyle = 'cursor-pointer font-semibold';

  const className = $derived(cn(colorStyles[color], sizeStyle[size], baseStyle));
</script>

{#if href}
  <a {href}>{@render children()}</a>
{:else}
  <button {onClick} class={className}>{@render children()}</button>
{/if}
