<!-- src\lib\components\Form.svelte -->
<script>
  import { enhance } from '$app/forms';
  import { LoaderCircle, X } from 'lucide-svelte';
  import Button from './Button.svelte';
  const {
    title,
    cancel,
    children = () => {},
    loading = false,
    isEdit = false,
    enhance: enhanceAction = undefined,
    submitButtonText = ['Save', 'Update'],
    cancelButtonText = 'Cancel',
    ...props
  } = $props();

  function handleCancel(e) {
    if (cancel) cancel();
    else window.history.back();
  }

  function conditionalEnhance(node, handler) {
    if (!handler) return;
    return enhance(node, handler);
  }
</script>

<form
  class="bg-white dark:bg-amber-950/30 shadow-md rounded-md"
  {...props}
  use:conditionalEnhance={enhanceAction}
>
  <!-- Card Header -->
  <div
    class="border-b-2 border-amber-200 dark:border-amber-900 bg-amber-100 dark:bg-amber-950 px-3 py-2 flex justify-between rounded-t-md"
  >
    <h1 class="text-2xl font-semibold text-amber-900 dark:text-amber-100">{title}</h1>
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
  <div class="p-4">
    {@render children()}
  </div>

  <!-- Card Footer -->
  <div
    class="border-t-2 border-amber-200 dark:border-amber-900 bg-amber-100 dark:bg-amber-950 px-3 py-2 flex gap-2 justify-end rounded-b-md"
  >
    <Button color="success" type="submit">
      {#if loading}
        <LoaderCircle class="animate-spin mr-1" /> Loading...
      {:else}
        <span>{isEdit ? submitButtonText[1] || 'Update' : submitButtonText[0] || 'Save'}</span>
      {/if}
    </Button>
    <Button type="button" onclick={handleCancel}>{cancelButtonText}</Button>
  </div>
</form>
