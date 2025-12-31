<script>
  import Switch from '$lib/components/Switch.svelte';
  import {
    CircleUser,
    LucideAirplay,
    LucideArrowLeft,
    LucideChevronRight,
    LucidePalette,
    LucideShield,
    Search,
    User
  } from 'lucide-svelte';
  import SwitchSetting from './SwitchSetting.svelte';
  import LinkSetting from './LinkSetting.svelte';
  import SettingsGroup from './SettingsGroup.svelte';
  import { groupedSettingsConfig } from './settingsConfig';

  const groupedSettings = $state(groupedSettingsConfig);
  let search = $state('');

  // Settings Search Query
  const filteredGroupedSettings = $derived(() => {
    const q = search.trim().toLowerCase();
    if (!q) return groupedSettings;

    return groupedSettings
      .map((group) => {
        const filteredSettings = group.settings.filter(
          (setting) =>
            setting.name.toLowerCase().includes(q) || setting.description?.toLowerCase().includes(q)
        );

        return {
          ...group,
          settings: filteredSettings
        };
      })
      .filter((group) => group.settings.length > 0);
  });
</script>

<div class="min-h-full">
  <div
    class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 h-[90vh] overflow-y-auto mt-[5vh]"
  >
    <!-- Header -->
    <div
      class="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-inherit z-10"
    >
      <!-- Left Side -->
      <button
        onclick={() => history.back()}
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Go back"
      >
        <LucideArrowLeft class="w-5 h-5" />
      </button>
      <h1 class="text-xl font-semibold">Settings</h1>

      <!-- Center Spaceing -->
      <div class="flex-1"></div>

      <!-- Right Side -->
      <div
        class="group flex items-center border-b border-gray-500 focus-within:border-b-2 focus-within:border-emerald-500 font-semibold"
      >
        <Search
          class="text-gray-500 group-focus-within:text-emerald-500"
          size={18}
          strokeWidth={3}
        />
        <input
          type="text"
          class="outline-none p-1 ml-1"
          placeholder="Search..."
          bind:value={search}
        />
      </div>
    </div>

    <!-- ===== GENERAL ===== -->
    {#each filteredGroupedSettings() as group}
      <SettingsGroup title={group.title}>
        {#each group.settings as setting}
          {#if setting.hasOwnProperty('href')}
            <LinkSetting {...setting} />
          {:else if setting.hasOwnProperty('key')}
            <SwitchSetting {...setting} />
          {/if}
        {/each}
      </SettingsGroup>
    {/each}
  </div>
</div>
