<!-- src\routes\(auth)\login\+page.svelte -->
<script>
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import { showToast } from '$lib/stores/toast';
  import { goto } from '$app/navigation';
  import { Eye } from 'lucide-svelte';

  const { data } = $props();
  let { showPassword } = $state(false);

  let formData = $state({
    user: '',
    password: ''
  });

  function handleForm() {
    return async ({ result }) => {
      if (result.type === 'redirect') {
        await goto(result.location, { invalidateAll: true });
      } else if (result.type === 'failure') {
        showToast(result.data.message, 'danger');
      }
    };
  }
</script>

<div class="pt-26 max-w-lg mx-auto">
  <Form title="Login" action="?/login" method="POST" autoComplete="off" enhance={handleForm}>
    <InputField placeholder="User" name="username" options={data.userList} silent={true} />
    <InputField
      placeholder="Password"
      name="password"
      type={!showPassword && 'password'}
      suffix={Eye}
      caseMode="none"
      onSuffixClick={() => (showPassword = !showPassword)}
    />
  </Form>
</div>
