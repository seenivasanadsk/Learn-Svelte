<script>
  import { FileInput, LucideChevronLeft, LucideChevronRight } from 'lucide-svelte';
  import Button from './Button.svelte';
  import IconButton from './IconButton.svelte';
  import Popover from './Popover.svelte';
  import InputField from './InputField.svelte';

  const itemsPerPageOptions = [10, 15, 20, 25, 50, 100, 200, 250, 500];

  let { page = $bindable(1), totalItems, itemsPerPage = $bindable(25) } = $props();

  let customPage = $state('');
  let showCustomPage = $state(false);

  const totalPages = $derived(Math.ceil(totalItems / itemsPerPage));

  const pageNumbers = $derived(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    pages.push(1);

    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...');

    pages.push(totalPages);

    return pages;
  });

  function handleCustomPage() {
    let cPage = Math.floor(Number(customPage));
    console.log(cPage);
    if (cPage > 0 && cPage <= totalPages) {
      page = cPage;
    }
  }

  $effect(() => {
    page = itemsPerPage && 1; // Whenever items per page changes reset page to 1
  });
</script>

{#if totalPages <= 1}
  <span></span>
{:else}
  <div class="flex justify-center items-center gap-1">
    <select
      type="text"
      size="1"
      class="border-2 outline-none px-1 border-amber-500 dark:border-amber-700 rounded appearance-none text-amber-700 dark:text-amber-500 text-center"
      bind:value={itemsPerPage}
    >
      {#each itemsPerPageOptions as p}
        <option
          class="bg-amber-50 dark:bg-amber-900 text-amber-900 dark:text-amber-50 font-semibold"
          value={p}
        >
          {p}
        </option>
      {/each}
    </select>

    <Button size="xs" radius="sm" disabled={page === 1} onclick={() => (page = page - 1)}>
      <LucideChevronLeft />
    </Button>

    {#each pageNumbers() as p}
      {#if p !== '...'}
        <Button size="sm" color={page === p ? 'primary' : 'accent'} onclick={() => (page = p)}>
          {p}
        </Button>
      {:else}
        <span class="text-amber-600">&hellip;</span>
      {/if}
    {/each}

    <Button size="xs" radius="sm" disabled={page === totalPages} onclick={() => (page = page + 1)}>
      <LucideChevronRight />
    </Button>

    <Popover class="mt-1!" show={showCustomPage} onblur={() => (showCustomPage = false)}>
      {#snippet trigger()}
        <Button onclick={() => (showCustomPage = true)} size="xs" radius="sm">
          <FileInput />
        </Button>
      {/snippet}
      <div class="flex gap-2 items-center rounded p-2">
        <InputField
          placeholder="Go to Page"
          class="w-26! mb-0! appearance-none"
          bind:value={customPage}
          type="number"
        />
        <Button onclick={handleCustomPage}>Go</Button>
      </div>
    </Popover>
  </div>
{/if}
