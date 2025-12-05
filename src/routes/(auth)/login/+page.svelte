<script>
  import Button from '$lib/components/Button.svelte';
  import { Moon, Sun } from 'lucide-svelte';
</script>

<div>
  <Button variant="accent" size="sm" prefix={Sun} suffix={Moon} class="m-5">Test</Button>
</div>
