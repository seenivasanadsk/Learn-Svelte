<script>
  import DataTable from '$lib/components/DataTable.svelte';
  import FilterModel from '$lib/components/FilterModel.svelte';
  import { syncOff, syncOn } from '$lib/core/client/sseReceiver.js';
  let { data } = $props();

  $effect(() => {
    syncOn('USER_UPDATED');
    return () => {
      syncOff('USER_UPDATED');
    };
  });
</script>

<DataTable
  items={data?.listData?.items || []}
  headers={data?.listData?.headers || []}
  total={data?.listData?.total || 0}
  showed={data?.listData?.showed || 0}
/>

<!-- <div class="p-5">
  <FilterModel>Trigger Filter Model</FilterModel>
</div> -->
