<script>
  import DataTable from '$lib/components/DataTable.svelte';
  import FilterModel from '$lib/components/FilterModel.svelte';
  import Model from '$lib/components/Model.svelte';
  import { syncOff, syncOn, updatesOff, updatesOn } from '$lib/core/client/sseReceiver.js';
  import UserForm from './UserForm.svelte';
  let { data } = $props();
  let items = $state(data?.listData?.items || []);
  let showForm = $state(false);

  function handleOpenForm() {
    showForm = true;
  }

  function handleCloseForm() {
    showForm = false;
  }

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
  openForm={handleOpenForm}
  closeForm={handleCloseForm}
  title="Users"
/>

<div class="h-full flex justify-center items-center">
  <Model
    open={showForm}
    modelClass="w-full max-w-md"
    autoFocusTabIndex={1}
    onClose={handleCloseForm}
  >
    <UserForm onClose={handleCloseForm} />
  </Model>
</div>

<!-- <div class="p-5">
  <FilterModel>Trigger Filter Model</FilterModel>
</div> -->
