<script>
  let {
    fields = [
      { name: 'name', title: 'Name', placeholder: 'Name' },
      { name: 'number', title: 'Number', placeholder: 'Number' }
    ],
    length = 3,
    title = 'Phone Numbers',
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
    $inspect(value);
  });

  function updateValue(rowIndex, fieldName, newValue) {
    value = value.map((row, i) => (i === rowIndex ? { ...row, [fieldName]: newValue } : row));
  }
</script>

<div
  class="overflow-hidden rounded-md border-2 border-gray-400 **:border-gray-400 font-semibold mb-3"
>
  <div
    class="border-b-2 p-2 text-center font-bold bg-gray-300/50 dark:bg-gray-800/50 flex justify-between"
  >
    <span>{title}</span>
    <button
      class="size-6 rounded-full bg-green-600 text-white
         inline-flex items-center justify-center
         text-xl font-bold
         outline-offset-1
         focus-visible:outline-2
         hover:outline-2
         hover:outline-green-500
         focus-visible:outline-green-500"
    >
      <span class="leading-none -mt-1">+</span>
    </button>
  </div>

  <table class="w-full border-collapse">
    <thead class="bg-gray-300/50 dark:bg-gray-800/50">
      <tr class="border-b-2">
        <th class="px-2 py-1 border-r-2 w-0">#</th>
        {#each fields as field}
          <th class="px-2 py-1 border-r-2">{field.title}</th>
        {/each}
        <th class="px-2 py-1 w-0">@</th>
      </tr>
    </thead>

    <tbody>
      {#each Array.from({ length }) as _, i}
        <tr class="not-last:border-b-2">
          <td class="border-r-2 p-1 text-center">{i + 1}</td>
          {#each fields as { placeholder, ...field }}
            <td class="border-r-2">
              <input
                class="w-full px-2 py-1 focus:outline-amber-500 focus:outline-2 focus:bg-amber-50 dark:focus:bg-amber-950"
                placeholder={`${placeholder} ${i + 1}`}
                {...field}
                oninput={(e) => {
                  updateValue(i, field.name, e.target.value);
                }}
              />
            </td>
          {/each}
          <td class="text-center">{i + 1}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
