<script>
  let {
    fields = [
      { name: 'seeni', title: 'Seeni', placeholder: 'seeni 12', width: '200px' },
      { name: 'vasan', title: 'Vasan', placeholder: 'vasan 34', width: '250px' }
    ],
    length = 3,
    value = $bindable([]),
    disabled = false
  } = $props();

  // Initialize rows
  $effect(() => {
    if (!value || value.length === 0) {
      value = Array.from({ length }, () => {
        const row = {};
        fields.forEach((f) => (row[f.name] = ''));
        return row;
      });
    }
  });

  function updateValue(rowIndex, fieldName, newValue) {
    value = value.map((row, i) => (i === rowIndex ? { ...row, [fieldName]: newValue } : row));
  }
</script>

<div class="w-full border-2 border-gray-400 rounded-md overflow-hidden">
  <!-- HEADER -->
  <div
    class="grid bg-gray-100 border-b-2 border-gray-400"
    style="grid-template-columns: {gridTemplate};"
  >
    {#each fields as field}
      <div class="px-4 py-2 font-medium border-r-2 border-gray-400 last:border-r-0">
        {field.title}
      </div>
    {/each}
  </div>

  <!-- ROWS -->
  {#each value as row, rowIndex}
    <div
      class="grid border-b border-gray-300 last:border-b-0
               {rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}"
      style="grid-template-columns: {gridTemplate};"
    >
      {#each fields as field}
        <div class="px-2 py-1 border-r border-gray-300 last:border-r-0">
          <input
            type="text"
            placeholder={field.placeholder}
            class="w-full bg-transparent
                     outline-none border-none
                     text-sm"
            bind:value={row[field.name]}
            {disabled}
            oninput={(e) => updateValue(rowIndex, field.name, e.target.value)}
          />
        </div>
      {/each}
    </div>
  {/each}
</div>
