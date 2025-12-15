<script>
  import { enhance } from '$app/forms';
  import { X } from 'lucide-svelte';
  import Button from './Button.svelte';
  const { title, cancel, rounded = 'md', children = () => {} } = $props();

  function handleCancel(e) {
    if (cancel) cancel();
    else window.history.back();
  }
</script>

<form method="POST" class="bg-white shadow rounded-{rounded} overflow-hidden" use:enhance>
  <!-- Card Header -->
  <div class="border-b border-amber-200 bg-amber-100 px-3 py-2 flex justify-between">
    <h1 class="text-2xl font-semibold text-amber-900">{title}</h1>
    {#if cancel}
      <div class="inline-flex items-center">
        <button
          class="text-2xl border rounded-full bg-red-700 hover:bg-red-800 focus:bg-red-800 outline-2 outline-offset-1 hover:outline-red-800 outline-transparent focus:outline-red-800 text-white cursor-pointer"
          onclick={cancel}
          type="button"
        >
          <X class="w-6 h-6 p-1" strokeWidth={3} size={8} />
        </button>
      </div>
    {/if}
  </div>

  <!-- Card Body -->
  <div class="p-3">
    {@render children()}
  </div>

  <!-- Card Footer -->
  <div class="border-t border-amber-200 bg-amber-100 px-3 py-2 flex gap-2 justify-end">
    <Button color="success" type="submit">Submit</Button>
    <Button color="dim" type="button" onclick={handleCancel}>Cancel</Button>
  </div>
</form>
