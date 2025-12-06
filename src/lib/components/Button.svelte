<script>
  import cn from '$lib/utils/cn';

  // -------------------------------------
  // Props
  // -------------------------------------
  let {
    children,
    href = '',
    onClick = () => {},
    color = 'accent',
    size = 'md',
    radius = '',
    prefix = null,
    suffix = null,
    class: userClass = ''
  } = $props();

  // -------------------------------------
  // Styles
  // -------------------------------------
  const colorStyles = {
    primary:
      'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 outline-blue-600 active:bg-blue-700',
    accent:
      'bg-amber-500 text-white hover:bg-amber-600 focus:bg-amber-600 outline-amber-600 active:bg-amber-700',
    success:
      'bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 outline-green-600 active:bg-green-700',
    danger:
      'bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 outline-red-600 active:bg-red-800',
    dim: 'bg-gray-300 text-black hover:bg-gray-400 focus:bg-gray-400 outline-gray-400 active:bg-gray-500'
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1 text-base',
    lg: 'px-4 py-2 text-xl'
  };

  const radiusStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  const baseClass =
    'cursor-pointer font-semibold inline-flex items-center focus:outline-2 focus:outline-offset-1';

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

<!-- -------------------------------------
      Render Output
-------------------------------------- -->

{#if href}
  <!-- Anchor Button -->
  <a {href} class={className}>
    {#if prefix}
      {@const Prefix = prefix}
      <Prefix class={prefixClass} size={iconSize} />
    {/if}

    {@render children()}

    {#if suffix}
      {@const Suffix = suffix}
      <Suffix class={suffixClass} size={iconSize} />
    {/if}
  </a>
{:else}
  <!-- Normal Button -->
  <button class={className} {onClick}>
    {#if prefix}
      {@const Prefix = prefix}
      <Prefix class={prefixClass} size={iconSize} />
    {/if}

    {@render children()}

    {#if suffix}
      {@const Suffix = suffix}
      <Suffix class={suffixClass} size={iconSize} />
    {/if}
  </button>
{/if}
