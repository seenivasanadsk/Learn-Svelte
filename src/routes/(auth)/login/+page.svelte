<script>
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import { showToast } from '$lib/stores/toast';
  let formData = $state({
    user: '',
    password: ''
  });
</script>

<div class="pt-26 max-w-lg mx-auto">
  <Form title="Login" rounded="lg">
    <InputField placeholder="User" />
    <InputField placeholder="Password" />
  </Form>
</div>
