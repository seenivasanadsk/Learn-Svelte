<script>
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';

  let { onClose } = $props();

  function handleSubmit() {
    return async (result) => {
      console.log(result);
    };
  }
</script>

<Form
  method="POST"
  action="?/create"
  title="Create User"
  submitButtonText={['Create']}
  cancel={onClose}
  enhance={handleSubmit}
>
  <InputField placeholder="Name" autofocus />
</Form>
