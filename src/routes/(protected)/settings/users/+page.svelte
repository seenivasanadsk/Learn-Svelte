<script>
  import DataTable from '$lib/components/DataTable.svelte';
  import FilterModel from '$lib/components/FilterModel.svelte';
  import { syncOff, syncOn, updatesOff, updatesOn } from '$lib/core/client/sseReceiver.js';
  let { data } = $props();
  let items = $state(data?.listData?.items || []);

  $effect(() => {
    updatesOn('USER_UPDATED', (event) => {
      console.log('Recived Event', event);
      let findIndex = items.findIndex((i) => i._id === event.data?._id);
      items[findIndex] = event.data;
    });
    return () => {
      updatesOff('USER_UPDATED');
    };
  });
</script>

<DataTable
  {items}
  headers={data?.listData?.headers || []}
  total={data?.listData?.total || 0}
  showed={data?.listData?.showed || 0}
/>

<!-- <div class="p-5">
  <FilterModel>Trigger Filter Model</FilterModel>
</div> -->
