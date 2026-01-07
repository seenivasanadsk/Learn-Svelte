<script>
  import DataTable from '$lib/components/DataTable.svelte';
  import Model from '$lib/components/Model.svelte';
  import PartyForm from './PartyForm.svelte';

  let { data } = $props();

  let showForm = $state(false);
</script>

<DataTable
  items={data?.listData?.items || []}
  headers={data?.listData?.headers || []}
  total={data?.listData?.total || 0}
  showed={data?.listData?.showed || 0}
  title="Party"
  openForm={() => (showForm = true)}
/>

<Model
  open={showForm}
  modelClass="w-full max-w-md"
  autoFocusTabIndex={1}
  onClose={() => (showForm = false)}
>
  <PartyForm onClose={() => (showForm = false)} />
</Model>
