<script>
  import { Sun, Moon, PlusCircle } from 'lucide-svelte';
  import cn from '$lib/utils/cn';
  // -------------------------------------
  // Props
  // -------------------------------------
  let {
    children,
    href = '',
    value = $bindable(''),
    onClick = () => {},
    onPrefixClick = () => {},
    onSuffixClick = () => {},
    prefix = null,
    suffix = null,
    class: userClass = '',
    options = [],
    hasError = false,
    fullSearch = false,
    newValue = 'ignore', // ignore|accept|create
    ...props
  } = $props();

  let showOptions = $state(false);
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
    console.log(newVal); //  <== ToDo: we need to make the stringCase utils in helper file
    value = newVal.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function handleOnBlur() {
    if (options.length) {
      showOptions = false;
      const isValueExist = filtered.includes(value);
      if (!isValueExist && newValue != 'accept') value = '';
    }
  }

  function handleCreateOption() {
    console.log(value); // Todo: Make create options logics
  }
</script>

<div
  class="group inline-flex items-center border-2 border-gray-300 rounded-md font-semibold relative focus-within:border-amber-500 {hasError &&
    'error'}"
>
  <span class="p-1 border-r-2 border-gray-300 group-focus-within:border-amber-500">
    <Sun class="text-gray-500 inline-block group-focus-within:text-amber-500" />
  </span>

  <input
    type="text"
    class="outline-none py-1 px-2"
    bind:value
    oninput={handleInput}
    onkeydown={handleOptionNavigation}
    onfocus={() => (showOptions = true)}
    onblur={handleOnBlur}
  />

  <span class="p-1 border-l-2 border-gray-300 group-focus-within:border-amber-500">
    <Moon class="text-gray-500 inline-block group-focus-within:text-amber-500" />
  </span>

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
          <span class="text-green-600">
            <PlusCircle size="20" class="inline-block mb-0.5" /> Create
          </span>
          <span class="text-blue-600">'{value}'</span>
        </div>
      </div>
    {/if}
  {/if}
</div>
