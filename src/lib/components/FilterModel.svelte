<script>
  import Form from './Form.svelte';
  import InputField from './InputField.svelte';
  import Model from './Model.svelte';

  let { children, open, onOpen, onClose } = $props();
</script>

<Model trigger={children} {open} {onOpen} {onClose} autoFocusTabIndex={1}>
  <Form title="Filter" class="w-full max-w-2xl" cancel={onClose}>
    <InputField placeholder="Checking" />
    <InputField placeholder="Checking" />
    <InputField placeholder="Checking" />
    <InputField placeholder="Checking" />
    <InputField placeholder="Checking" />
  </Form>
</Model>
