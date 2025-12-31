<script>
  import LinkSetting from './LinkSetting.svelte';
  import SwitchSetting from './SwitchSetting.svelte';
  const { title, children } = $props();
</script>

<div class="border-t border-gray-200 dark:border-gray-700">
  <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">{title}</div>

  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    {@render children()}
  </div>
</div>
