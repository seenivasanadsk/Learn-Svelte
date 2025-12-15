<script>
  import { X } from 'lucide-svelte';
  const { title } = $props();
</script>

<div class="bg-white border rounded">
  <!-- Card Header -->
  <div class="border-b-2 border-amber-500 p-2 flex justify-between">
    <h1 class="text-2xl font-semibold">{title}</h1>
    <button
      class="text-2xl border rounded-full bg-red-700 hover:bg-red-800 focus:bg-red-800 outline-2 outline-offset-1 hover:outline-red-800 focus:outline-red-800 text-white cursor-pointer"
    >
      <X class="w-8" strokeWidth={3} />
    </button>
  </div>

  <!-- Card Body -->
  <div class="p-2">Check Body</div>

  <!-- Card Footer -->
  <div class="border-t-2 border-amber-500 p-2">Check Footer</div>
</div>
