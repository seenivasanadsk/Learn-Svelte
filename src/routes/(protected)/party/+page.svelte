<!-- src\routes\(protected)\party\+page.svelte -->

<script>
  import DataTable from '$lib/components/DataTable.svelte';
  import Model from '$lib/components/Model.svelte';
  import PartyForm from './PartyForm.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { syncOff, syncOn } from '$lib/core/client/sseReceiver';

  const { data } = $props();

  const showForm = $derived($page.url.searchParams.get('openForm') === 'true');

  function openForm() {
    const url = new URL($page.url);
    url.searchParams.set('openForm', 'true');
    goto(url, { replaceState: true });
  }

  function closeForm() {
    const url = new URL($page.url);
    url.searchParams.delete('openForm');
    url.searchParams.delete('editId');
    goto(url, { replaceState: true });
  }

  $effect(() => {
    syncOn('PARTY_UPDATED');
    return () => {
      syncOff('PARTY_UPDATED');
    };
  });
</script>

<DataTable
  items={data?.listData?.items || []}
  headers={data?.listData?.headers || []}
  total={data?.listData?.total || 0}
  showed={data?.listData?.showed || 0}
  title="Party"
  {openForm}
/>

<Model open={showForm} modelClass="w-full max-w-md" autoFocusTabIndex={1} onClose={closeForm}>
  <PartyForm onClose={closeForm} editableData={data.editableData} />
</Model>
