<script>
  /* ---------- PROPS ---------- */
  const {
    tip,
    position = 'top-center',
    class: userClass = '',
    tooltipClass = '',
    delay = 150,
    children
  } = $props();

  let show = $state(false);
  let timeout = $state(null);

  /* ---------- POSITION MAP ---------- */
  const positionConfig = {
    'top-left': 'bottom-full mb-2 left-0',
    'top-center': 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    'top-right': 'bottom-full mb-2 right-0',
    'bottom-left': 'top-full mt-2 left-0',
    'bottom-center': 'top-full mt-2 left-1/2 -translate-x-1/2',
    'bottom-right': 'top-full mt-2 right-0'
  };

  function open() {
    clearTimeout(timeout);
    timeout = setTimeout(() => (show = true), delay);
  }

  function close() {
    clearTimeout(timeout);
    show = false;
  }

  function onEscape(e) {
    if (e.key === 'Escape') close();
  }
</script>

<div
  class="relative inline-flex {userClass}"
  onmouseenter={open}
  onmouseleave={close}
  onfocusin={open}
  onfocusout={close}
  onkeydown={onEscape}
>
  <!-- TRIGGER -->
  {@render children()}

  {#if show}
    <div
      role="tooltip"
      class="
        pointer-events-none absolute z-50
        text-xs rounded-md
        bg-gray-900 text-white
        dark:bg-white dark:text-black
        shadow-md
        whitespace-nowrap
        {positionConfig[position]}
        {tooltipClass}
      "
    >
      {#if tip}
        {@render tip()}
      {/if}
    </div>
  {/if}
</div>
