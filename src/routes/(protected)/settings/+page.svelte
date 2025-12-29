<script>
  import Switch from '$lib/components/Switch.svelte';
  import {
    LucideAirplay,
    LucideArrowLeft,
    LucideChevronRight,
    LucidePalette,
    LucideShield,
    Search
  } from 'lucide-svelte';

  const iconBg = {
    red: 'bg-red-50 text-red-600 dark:bg-red-900/30',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30'
  };
</script>

<div class="min-h-full">
  <div
    class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 h-[90vh] overflow-y-scroll mt-[5vh]"
  >
    <!-- Header -->
    <div
      class="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-inherit z-10"
    >
      <button
        on:click={() => history.back()}
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Go back"
      >
        <LucideArrowLeft class="w-5 h-5" />
      </button>
      <h1 class="text-xl font-semibold">Settings</h1>

      <div class="flex-1"></div>

      <div
        class="group flex items-center border-b border-gray-500 focus-within:border-b-2 focus-within:border-emerald-500 font-semibold"
      >
        <Search
          class="text-gray-500 group-focus-within:text-emerald-500"
          size={18}
          strokeWidth={3}
        />
        <input type="text" class="outline-none p-1 ml-1" placeholder="Search..." />
      </div>
    </div>

    <!-- ===== GENERAL ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">General</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Toggle -->
        <div class="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/40">
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.red}`}>
            <LucideAirplay class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">AirPlay</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Enable AirPlay streaming lore</p>
          </div>

          <Switch />
        </div>

        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.emerald}`}>
            <LucidePalette class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Appearance</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Theme, colors and layout</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.emerald}`}>
            <LucidePalette class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Appearance</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Theme, colors and layout</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.emerald}`}>
            <LucidePalette class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Appearance</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Theme, colors and layout</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>

    <!-- ===== DISPLAY ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">Display</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Toggle -->
        <div class="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/40">
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.blue}`}>
            <LucidePalette class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Dark mode</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Automatically adjust appearance</p>
          </div>

          <Switch />
        </div>
      </div>
    </div>

    <!-- ===== SECURITY ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">Security</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.amber}`}>
            <LucideShield class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Change password</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
    <!-- ===== SECURITY ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">Security</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.amber}`}>
            <LucideShield class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Change password</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
    <!-- ===== SECURITY ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">Security</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.amber}`}>
            <LucideShield class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Change password</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
    <!-- ===== SECURITY ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">Security</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.amber}`}>
            <LucideShield class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Change password</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
    <!-- ===== SECURITY ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">Security</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.amber}`}>
            <LucideShield class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Change password</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
    <!-- ===== SECURITY ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">Security</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.amber}`}>
            <LucideShield class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Change password</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
    <!-- ===== SECURITY ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">Security</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.amber}`}>
            <LucideShield class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Change password</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
    <!-- ===== SECURITY ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">Security</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.amber}`}>
            <LucideShield class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Change password</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
    <!-- ===== SECURITY ===== -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <div class="px-5 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">Security</div>

      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Link -->
        <div
          class="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          <div class={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg.amber}`}>
            <LucideShield class="w-5 h-5" />
          </div>

          <div class="flex-1">
            <div class="text-sm font-medium">Change password</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
          </div>

          <LucideChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  </div>
</div>
