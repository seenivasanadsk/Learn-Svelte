<script>
  import { Sun } from 'lucide-svelte';
  import Button from './Button.svelte';

  const { children, ...props } = $props();
</script>

<Button size="sm" radius="md" {...props}>
  {@render children()}
</Button>
