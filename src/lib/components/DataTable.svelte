<script>
  import { CirclePlus, Funnel, IdCard, Search, Table } from 'lucide-svelte';
  import Button from './Button.svelte';
  import IconButton from './Button.svelte';
  import Badge from './Badge.svelte';
  import Pagination from './Pagination.svelte';
  import Popover from './Popover.svelte';
  import InputField from './InputField.svelte';
  import { keyboardEventBus } from '$lib/utils/eventBus';
  import FilterModel from './FilterModel.svelte';

  const options = $state({ page: 1 });
  let showSearchBar = $state(false);
  let showTable = $state(true);
  let openFilter = $state(false);

  function toggleSearchBar(type = null) {
    showSearchBar = type == null ? !showSearchBar : type;
  }

  function toggleTable(_, type = null) {
    showTable = type == null ? !showTable : type;
  }

  const handleOpenFilter = () => (openFilter = true);
  const handleCloseFilter = () => (openFilter = false);

  $effect(() => {
    keyboardEventBus.on('7', toggleTable);
    keyboardEventBus.on('8', toggleSearchBar);
    keyboardEventBus.on('9', handleOpenFilter);
    return () => {
      keyboardEventBus.off('7', toggleTable);
      keyboardEventBus.off('8', toggleSearchBar);
      keyboardEventBus.off('9', handleOpenFilter);
    };
  });
</script>

<div class="h-full font-semibold">
  <div
    class="max-w-11/12 mx-auto bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-xl shadow-xl h-[94dvh] mt-[3dvh] flex flex-col overflow-hidden"
  >
    <!-- Header -->
    <div
      class="sticky top-0 z-20 bg-amber-100/80 dark:bg-amber-950/60 backdrop-blur p-3 flex items-center border-b border-amber-200 dark:border-amber-900"
    >
      <!-- Header Left -->
      <div class="flex-1 flex items-center gap-2">
        <h1 class="text-3xl font-bold tracking-tight text-amber-950 dark:text-amber-50">Users</h1>
      </div>

      <!-- Header Center -->
      <div class="flex-1 flex items-center gap-2 justify-center">Internal Navigation</div>

      <!-- Header Right -->
      <div class="flex-1 flex justify-end gap-2 items-center">
        <IconButton onclick={toggleTable}>
          {#if showTable}
            <IdCard />
          {:else}
            <Table />
          {/if}
        </IconButton>

        <!-- Search Popover -->
        <Popover
          size="md"
          radius="md"
          position="bottom-center"
          triggerAction="manual"
          popoverClass="w-58"
          show={showSearchBar}
          onClose={() => (showSearchBar = false)}
        >
          {#snippet trigger()}
            <Button onclick={() => (showSearchBar = !showSearchBar)}>
              <Search />
            </Button>
          {/snippet}
          <InputField placeholder="Search..." prefix={Search} />
        </Popover>

        <!-- Filter Popover -->
        <FilterModel open={openFilter} onOpen={handleOpenFilter} onClose={handleCloseFilter}>
          <IconButton><Funnel /></IconButton>
        </FilterModel>

        <Button prefix={CirclePlus} color="success">New Entry</Button>
      </div>
    </div>

    <!--  -->
    <!--  -->
    <!-- Body -->
    <!-- Body Start -->
    <div class="p-3 flex-1 overflow-hidden">
      <div
        class="h-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900"
      >
        <table class="w-full">
          <thead
            class="sticky top-0 z-10 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
          >
            <tr class="text-left">
              <th class="px-2.5 py-1.5 font-semibold">S.No</th>
              <th class="px-2.5 py-1.5 font-semibold">Test</th>
              <th class="px-2.5 py-1.5 font-semibold">Name</th>
              <th class="px-2.5 py-1.5 font-semibold">ADSK</th>
            </tr>
          </thead>

          <tbody>
            {#each Array.from({ length: 50 }) as _, i}
              <tr
                class="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900 dark:even:bg-gray-800
                       hover:bg-amber-100 dark:hover:bg-amber-600/30"
              >
                <td class="px-2.5 py-1.5 font-medium">{i + 1}</td>
                <td class="px-2.5 py-1.5">Test</td>
                <td class="px-2.5 py-1.5">Name</td>
                <td class="px-2.5 py-1.5">ADSK</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <!-- Body End -->
    <!--  -->
    <!--  -->

    <!-- Footer -->
    <div
      class="bg-amber-100/80 dark:bg-amber-950/60 p-2 flex items-center border-t border-amber-200 dark:border-amber-900"
    >
      <!-- Footer Left -->
      <div class="flex-1 text-gray-600 dark:text-gray-400">
        <Button>View</Button>
      </div>

      <!-- Footer Center -->
      <div class="flex-1 text-gray-600 dark:text-gray-400 flex justify-center">
        <Pagination bind:page={options.page} totalItems={300} />
      </div>

      <!-- Footer Right -->
      <div class="flex-1 flex justify-end gap-2">
        <Badge>Total: {'100'}</Badge>
        <Badge>Showed: {'50'}</Badge>
      </div>
    </div>
  </div>
</div>
