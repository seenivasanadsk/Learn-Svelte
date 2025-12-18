<script>
  import { toasts, closeToast } from '$lib/stores/toast';
  import { X } from 'lucide-svelte';

  const styles = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-amber-500 text-black'
  };
</script>

<div class="fixed bottom-5 right-5 z-30 flex flex-col gap-4">
  {#each $toasts as toast (toast.id)}
    <div
      class={`
        px-3 py-2 rounded-xl shadow-lg min-w-[280px]
        flex items-center justify-between gap-5
        text-white
        animate-slide-in
        ${styles[toast.type] || styles.success}
      `}
    >
      <!-- Message -->
      <span class="text-base leading-relaxed">
        {toast.message}
      </span>

      <!-- Close button -->
      <button
        on:click={() => closeToast(toast.id)}
        class="
          flex justify-center items-center
          w-9 h-9
          text-3xl
          rounded-full
          text-white/80
          hover:text-white
          hover:bg-white/25
          transition
          cursor-pointer
          shrink-0
        "
        aria-label="Close"
      >
        <X />
      </button>
    </div>
  {/each}
</div>
