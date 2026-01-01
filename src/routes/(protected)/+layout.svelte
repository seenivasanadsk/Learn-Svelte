<!-- src/routes/(protected)/+layout.svelte -->

<script>
  import { onMount } from 'svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { invalidateAll } from '$app/navigation';
  import { keyboardEventBus } from '$lib/utils/eventBus';

  const { children, data } = $props();
  let user = $state(data.user);
  let isSidebarOpen = $state(true);

  // Update user when data changes
  $effect(() => {
    user = data.user;
  });

  // Check on mount if user is missing but should be logged in
  onMount(async () => {
    if (!user) {
      // Try to re-fetch the data
      await invalidateAll();
    }
  });

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  keyboardEventBus.on('Alt+X', toggleSidebar);
</script>

<div class="relative h-full overflow-hidden">
  <!-- MAIN -->
  <main
    class="
      h-full
      transition-[padding-right]
      duration-300
      ease-in-out
    "
    style="padding-right: {isSidebarOpen ? '10rem' : '0'}"
  >
    {@render children()}
    <!-- <div class="text-9xl text-red-700">☠︎︎</div> -->
  </main>

  <!-- SIDEBAR (slides from right) -->
  <aside
    class="
      absolute
      top-0
      right-0
      h-full
      w-40
      transition-transform
      duration-300
      ease-in-out
      will-change-transform
    "
    class:translate-x-0={isSidebarOpen}
    class:translate-x-full={!isSidebarOpen}
  >
    <Sidebar {toggleSidebar} {user} ip={data.serverIP} port={data.port} />
  </aside>
</div>
