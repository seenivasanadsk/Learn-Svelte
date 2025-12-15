<script>
  import cn from '$lib/utils/cn';
  import Button from './Button.svelte';
  const { children, class: userClass = '' } = $props();
</script>

<span>
  <Button>Test</Button>

  <!-- Overlay -->
  <div class="absolute bg-black/30 w-dvw h-dvh inset-0">
    <div
      class={cn(
        'bg-white min-w-md absolute top-10 left-1/2 -translate-x-1/2 rounded overflow-auto',
        userClass
      )}
    >
      {@render children()}
    </div>
  </div>
</span>
