<script>
  import cn from '$lib/utils/cn';

  // -------------------------------------
  // Props
  // -------------------------------------
  let {
    href = '',
    onClick = () => {},
    onPrefixClick = () => {},
    onSuffixClick = () => {},
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
    primary: 'hover:border-blue-600 focus-within:border-blue-600',
    accent: 'hover:border-amber-600 focus-within:border-amber-600',
    success: 'hover:border-green-600 focus-within:border-green-600',
    danger: 'hover:border-red-600 focus-within:border-red-600',
    dim: 'hover:border-gray-400 focus-within:border-gray-400'
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

  const baseClass = 'inline-block border-2 border-gray-400 font-semibold';

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
  {#if prefix}
    {@const Prefix = prefix}
    <Prefix class={prefixClass} size={iconSize} />
  {/if}
  <input type="text" class="outline-none" />
  {#if suffix}
    {@const Suffix = suffix}
    <Suffix class={suffixClass} size={iconSize} />
  {/if}
</div>
