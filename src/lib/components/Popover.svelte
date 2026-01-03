<script>
  const { trigger, children, class: userClass = '', position = 'top-center' } = $props();

  const positionConfig = {
    'top-left': 'bottom-full mb-2',
    'top-center': 'bottom-full mb-2 -translate-x-1/2 left-1/2',
    'top-right': 'bottom-full mb-2 right-0',
    'bottom-left': 'top-full mt-2',
    'bottom-center': 'top-full mt-2 -translate-x-1/2 left-1/2',
    'bottom-right': 'top-full mt-2 right-0'
  };

  const svgConfig = {
    'top-left': '-bottom-2 left-4',
    'top-center': '-bottom-2 left-1/2',
    'top-right': '-bottom-2 right-4',
    'bottom-left': '-top-2 rotate-180',
    'bottom-center': '-top-2 rotate-180 left-1/2',
    'bottom-right': '-top-2 rotate-180 right-4'
  };
</script>

<div class="relative inline-block">
  {@render trigger()}

  <div
    class="absolute w-md bg-white p-2 rounded-md shadow-lg dark:bg-amber-950/50
    {positionConfig[position]} {userClass}"
  >
    <!-- SVG Arrow Down -->
    <svg class="absolute {svgConfig[position]}" width="16" height="8" viewBox="0 0 16 8">
      <path
        d="M0 0 L8 8 L16 0 Z"
        class="fill-white dark:fill-amber-950/50"
        filter={position.startsWith('top') && 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.2))'}
      />
    </svg>

    {@render children()}
  </div>
</div>
