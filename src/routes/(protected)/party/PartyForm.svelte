<script>
  import CheckBoxField from '$lib/components/CheckBoxField.svelte';
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import MultiField from '$lib/components/MultiField.svelte';

  let { onClose } = $props();

  let data = $state({
    name: '',
    note: '',
    isActive: false
  });

  $effect(() => {
    $inspect(data);
  });
</script>

<Form title="Create Party" submitButtonText={['Create']} cancel={onClose}>
  <InputField placeholder="Name" name="name" bind:value={data.name} autofocus />
  <InputField placeholder="Note" name="note" bind:value={data.note} />
  <MultiField />
  <CheckBoxField placeholder="Active" name="isActive" bind:value={data.isActive} />
</Form>
