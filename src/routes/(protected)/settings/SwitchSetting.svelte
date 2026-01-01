<script>
  import Switch from '$lib/components/Switch.svelte';
  import { LucideAirplay, Settings } from 'lucide-svelte';
  import { iconBg } from './settingsConfig';

  const { name, icon: Icon = Settings, color = 'grey', description, key } = $props();
</script>

<div class="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/40">
  <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg[color]}`}>
    <Icon class="w-5 h-5" />
  </div>

  <div class="flex-1">
    <div class="text-sm font-medium">{name}</div>
    <p class="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>

  <Switch />
</div>
