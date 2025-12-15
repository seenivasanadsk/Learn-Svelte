<script>
  import { PlusCircle, Loader2Icon } from 'lucide-svelte';
  import cn from '$lib/utils/cn';
  import stringCase from '$lib/utils/stringCase';
  // -------------------------------------
  // Props
  // -------------------------------------
  let {
    value = $bindable(''),
    onPrefixClick = () => {},
    onSuffixClick = () => {},
    prefix = null,
    suffix = null,
    class: userClass = '',
    options = [],
    hasError = false,
    fullSearch = false,
    newValue = 'ignore', // ignore|accept|create
    createOption = () => {},
    placeholder = '',
    ...props
  } = $props();

  let showOptions = $state(false);
  let optionLoading = $state(false);
  let optionCreateError = $state(false);
  let selectedOptionIndex = $state(0);
  let filtered = $derived(
    fullSearch
      ? options.filter((o) => o.toLowerCase().includes(value.toLowerCase()))
      : options.filter((o) => o.toLowerCase().startsWith(value.toLowerCase()))
  );

  // Auto-scroll when selectedOptionIndex changes
  $effect(() => {
    if (showOptions && selectedOptionIndex >= 0) {
      // Wait for DOM to update, then scroll
      setTimeout(() => {
        const selectedElement = document.querySelector(
          `[data-option-index="${selectedOptionIndex}"]`
        );
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: 'nearest' });
        }
      }, 10);
    }
  });

  function handleOptionNavigation(e) {
    // Prevent default behavior for navigation keys
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === 'ArrowDown') {
      // Navigate down with loop from bottom to top
      if (selectedOptionIndex < filtered.length - 1) {
        selectedOptionIndex++;
      } else {
        selectedOptionIndex = 0; // Loop back to first option
      }
    } else if (e.key === 'ArrowUp') {
      // Navigate up with loop from top to bottom
      if (selectedOptionIndex > 0) {
        selectedOptionIndex--;
      } else {
        selectedOptionIndex = filtered.length - 1; // Loop to last option
      }
    } else if (e.key === 'Enter') {
      if (newValue == 'create' && filtered.length == 0) {
        handleCreateOption();
      } else {
        // Select current option and close dropdown
        if (filtered.length > 0) {
          value = filtered[selectedOptionIndex];
          showOptions = false;
        }
      }
    } else if (e.key === 'Escape') {
      // Close dropdown without selecting
      showOptions = false;
    } else if (e.key === 'Tab') {
      // Close dropdown when tabbing away
      showOptions = false;
    }
  }

  function handleOptionClick(e, index) {
    e.preventDefault();
    value = filtered[index];
    showOptions = false;
  }

  function handleInput(e) {
    const newVal = e.target.value;
    value = stringCase.smartTitle(newVal);
    optionCreateError = false;
  }

  function handleOnBlur() {
    if (options.length) {
      showOptions = false;
      const isValueExist = filtered.includes(value);
      if (!isValueExist && newValue != 'accept') value = '';
    }
  }

  async function handleCreateOption(e) {
    e.preventDefault();
    optionLoading = true;
    optionCreateError = !(await createOption(value));
    optionLoading = false;
  }
</script>

<div
  class={cn(
    'group inline-flex items-center border-2 border-gray-400 rounded-md font-semibold relative focus-within:border-amber-500 w-full mb-3 last:mb-0',
    hasError && 'error'
  )}
>
  {#if prefix}
    <span
      role="button"
      class={cn(
        'p-1 border-r-2 text-gray-400 *:inline-block group-focus-within:text-amber-500 border-gray-400 group-focus-within:border-amber-500',
        hasError && 'border-red-500 group-focus-within:border-red-500',
        hasError && 'text-red-500 group-focus-within:text-red-500'
      )}
      onmousedown={onPrefixClick}
      tabindex="ignore"
    >
      {@render prefix({})}
    </span>
  {/if}

  <input
    type="text"
    class="outline-none py-1 px-2 w-full"
    bind:value
    {placeholder}
    oninput={handleInput}
    onkeydown={handleOptionNavigation}
    onfocus={() => (showOptions = true)}
    onblur={handleOnBlur}
  />

  {#if suffix}
    <span
      role="button"
      class={cn(
        'p-1 border-l-2 text-gray-400 *:inline-block group-focus-within:text-amber-500 border-gray-400 group-focus-within:border-amber-500',
        hasError && 'border-red-500 group-focus-within:border-red-500',
        hasError && 'text-red-500 group-focus-within:text-red-500'
      )}
      onmousedown={onSuffixClick}
      tabindex="ignore"
    >
      {@render suffix({})}
    </span>
  {/if}

  {#if options.length}
    {#if showOptions && filtered.length}
      <div
        class="absolute top-full max-h-50 overflow-auto left-0 w-full border-amber-500 border-2 rounded-b-md bg-white z-10"
      >
        {#each filtered as option, index (option)}
          <div
            role="option"
            aria-selected={selectedOptionIndex == index ? 'true' : 'false'}
            data-option-index={index}
            class={cn(
              'bg-white p-1 hover:bg-gray-300',
              selectedOptionIndex == index && 'bg-gray-200'
            )}
            onmousedown={(e) => handleOptionClick(e, index)}
            tabindex="0"
          >
            {option}
          </div>
        {/each}
      </div>
    {:else if showOptions && filtered.length == 0 && newValue == 'create'}
      <div
        class="absolute top-full max-h-50 overflow-auto left-0 w-full border-amber-500 border-2 rounded-b-md bg-white z-10"
      >
        <div
          class="bg-white px-2 py-1 hover:bg-amber-50 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
          title={value}
          onmousedown={handleCreateOption}
          role="button"
          tabindex="0"
        >
          {#if optionLoading}
            <div class="flex items-center gap-2 text-amber-600">
              <span class="animate-spin inline-block"><Loader2Icon /></span> Creating...
            </div>
          {:else if optionCreateError}
            <span class="text-red-500">Error Occured</span>
          {:else}
            <span class="text-green-600">
              <PlusCircle class="inline-block mb-0.5" /> Create
            </span>
            <span class="text-blue-600">'{value}'</span>
          {/if}
        </div>
      </div>
    {/if}
  {/if}
</div>
