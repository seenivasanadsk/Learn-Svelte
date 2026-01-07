<script>
  import CheckBoxField from '$lib/components/CheckBoxField.svelte';
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import MultiField from '$lib/components/MultiField.svelte';
  import { showToast } from '$lib/stores/toast';

  let { onClose, editableData } = $props();
  let phoneField = [
    { name: 'name', title: 'Name', placeholder: 'Name' },
    { name: 'number', title: 'Number', placeholder: 'Number' }
  ];

  let initData = {
    name: editableData?.name ?? '',
    note: editableData?.note ?? '',
    phone: editableData?.phone ?? [],
    isActive: editableData?._id ? (editableData?.isActive ?? false) : true
  };

  let data = $state(initData);

  function handleSubmit() {
    return ({ result }) => {
      if (result?.data?.message) {
        showToast(result.data.message, result.type === 'success' ? 'success' : 'danger');
      }
      if (result?.type === 'success') {
        onClose();
      }
    };
  }
</script>

<Form
  title={`${editableData?._id ? 'Update' : 'Create'} Party`}
  submitButtonText={[editableData?._id ? 'Update' : 'Create']}
  cancel={onClose}
  method="POST"
  action={editableData?._id ? '?/update' : '?/create'}
  enhance={handleSubmit}
>
  {#if editableData?._id}
    <input type="hidden" name="editId" value={editableData._id} />
    testst
  {/if}
  <InputField placeholder="Name" name="name" bind:value={data.name} autofocus />
  <InputField placeholder="Note" name="note" bind:value={data.note} />
  <MultiField
    fields={phoneField}
    length={1}
    title="Phone Numbers"
    fieldName="phone"
    bind:value={data.phone}
  />
  <CheckBoxField placeholder="Active" name="isActive" bind:value={data.isActive} />
</Form>
