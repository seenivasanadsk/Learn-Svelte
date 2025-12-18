<script>
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import { showToast } from '$lib/stores/toast';
  import { Eye } from 'lucide-svelte';

  const { data } = $props();
  let { showPassword } = $state(false);

  let formData = $state({
    user: '',
    password: ''
  });
</script>

<div class="pt-26 max-w-lg mx-auto">
  <Form title="Login" rounded="lg">
    <InputField placeholder="User" options={data.userList} silent={true} />
    <InputField
      placeholder="Password"
      type={!showPassword && 'password'}
      suffix={Eye}
      onSuffixClick={() => (showPassword = !showPassword)}
    />
  </Form>
</div>
