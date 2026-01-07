<script>
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';

  let { onClose } = $props();
</script>

<Form title="Create User" submitButtonText={['Create']} cancel={onClose}>
  <InputField placeholder="Name" autofocus />
</Form>
