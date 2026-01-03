<script>
  import Button from './Button.svelte';

  /* ---------- PROPS ---------- */
  const {
    trigger,
    children,
    class: userClass = '',
    popoverClass = '',
    position = 'top-center',
    size = '',
    radius = '',
    triggerAction = 'mouseenter' // 'mouseenter' | 'click' | 'focus'
  } = $props();

  /* ---------- STATE ---------- */
  let show = $state(false);
  let lastTriggeredEvent = $state('');
  let container;

  /* ---------- POSITION MAPS ---------- */
  const positionConfig = {
    'top-left': 'bottom-full mb-2',
    'top-center': 'bottom-full mb-2 -translate-x-1/2 left-1/2',
    'top-right': 'bottom-full mb-2 right-0',
    'bottom-left': 'top-full mt-2',
    'bottom-center': 'top-full mt-2 -translate-x-1/2 left-1/2',
    'bottom-right': 'top-full mt-2 right-0'
  };

  const svgConfig = {
    'top-left': '-bottom-2 left-4',
    'top-center': '-bottom-2 left-1/2 -translate-x-1/2',
    'top-right': '-bottom-2 right-4',
    'bottom-left': '-top-2 rotate-180 left-4',
    'bottom-center': '-top-2 rotate-180 left-1/2 -translate-x-1/2',
    'bottom-right': '-top-2 rotate-180 right-4'
  };

  /* ---------- TOGGLE LOGIC ---------- */
  function toggleShow(eventType) {
    if (lastTriggeredEvent === 'mouseenter' && eventType === 'mouseleave') {
      show = false;
      lastTriggeredEvent = '';
      return;
    }

    if (
      (lastTriggeredEvent === 'click' || lastTriggeredEvent === 'focus') &&
      eventType === 'blur'
    ) {
      show = false;
      lastTriggeredEvent = '';
      return;
    }

    if (eventType === triggerAction) {
      show = true;
      lastTriggeredEvent = eventType;
    }
  }

  /* ---------- CLICK OUTSIDE ACTION ---------- */
  function clickOutside(node, handler) {
    const handle = (event) => {
      if (!node.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener('click', handle, true);

    return {
      destroy() {
        document.removeEventListener('click', handle, true);
      }
    };
  }

  $effect(() => {
    if (show) {
      container.querySelector('input')?.focus();
    }
  });
</script>

<!-- ---------- WRAPPER ---------- -->
<div
  class="relative inline-block {userClass}"
  bind:this={container}
  onfocus={() => toggleShow('focus')}
  onblur={() => toggleShow('blur')}
  use:clickOutside={() => {
    if (lastTriggeredEvent === 'click') {
      show = false;
      lastTriggeredEvent = '';
    }
  }}
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <Button
    onmouseenter={() => toggleShow('mouseenter')}
    onmouseleave={() => toggleShow('mouseleave')}
    onclick={() => toggleShow('click')}
    {size}
    {radius}
  >
    {@render trigger()}
  </Button>

  {#if show}
    <div
      class="
        absolute z-50 p-2 rounded-md shadow-lg
        bg-white dark:bg-amber-950/50
        {positionConfig[position]} {popoverClass}
      "
    >
      <!-- ---------- ARROW ---------- -->
      <svg class="absolute {svgConfig[position]}" width="16" height="8" viewBox="0 0 16 8">
        <path
          d="M0 0 L8 8 L16 0 Z"
          class="fill-white dark:fill-amber-950/50"
          filter={position.startsWith('top')
            ? 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.2))'
            : undefined}
        />
      </svg>

      {@render children()}
    </div>
  {/if}
</div>
