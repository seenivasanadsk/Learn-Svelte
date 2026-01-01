<script>
  import { LucideChevronLeft, LucideChevronRight } from 'lucide-svelte';
  import Button from './Button.svelte';
  import IconButton from './IconButton.svelte';

  const { page, totalItems, onPageChange } = $props();

  let itemsPerPage = $state(25);
  const itemsPerPageOptions = [10, 15, 20, 25, 50, 100, 200, 250, 500];
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

  function change(p) {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  }
</script>

<div class="flex justify-center items-center gap-1">
  <select
    type="text"
    size="1"
    class="border-2 outline-none px-1 border-amber-500 dark:border-amber-700 rounded appearance-none text-amber-700 dark:text-amber-500 text-center"
    value={itemsPerPage}
  >
    {#each itemsPerPageOptions as p}
      <option value={p}>{p}</option>
    {/each}
  </select>

  <Button size="xs" radius="sm" disabled={page === 1} onclick={() => change(page - 1)}>
    <LucideChevronLeft />
  </Button>

  {#each pageNumbers() as p}
    {#if p !== '...'}
      <Button size="sm">{p}</Button>
    {:else}
      <span class="text-amber-600">&bull;</span>
    {/if}
  {/each}

  <Button size="xs" radius="sm" disabled={page === totalPages} onclick={() => change(page + 1)}>
    <LucideChevronRight />
  </Button>
</div>
