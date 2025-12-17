<!-- src/routes/(protected)/+layout.svelte -->

<script>
  const { children } = $props();
  let isSidebarOpen = $state(true);
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { keyboardEventBus } from '$lib/utils/eventBus';

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
    <Sidebar {toggleSidebar} />
  </aside>
</div>
