<script>
  import { Sun } from 'lucide-svelte';
  import Button from './Button.svelte';

  const { children, ...props } = $props();
</script>

<Button class="p-2" {...props}>
  {@render children()}
</Button>
