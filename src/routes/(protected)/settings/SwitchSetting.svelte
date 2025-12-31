<script>
  import Switch from '$lib/components/Switch.svelte';
  import { LucideAirplay } from 'lucide-svelte';
  import { iconBg } from './settingsConfig';

  const { color } = $props();
</script>

<div class="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/40">
  <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg[color]}`}>
    <LucideAirplay class="w-5 h-5" />
  </div>

  <div class="flex-1">
    <div class="text-sm font-medium">AirPlay</div>
    <p class="text-sm text-gray-600 dark:text-gray-400">Enable AirPlay streaming lore</p>
  </div>

  <Switch />
</div>
