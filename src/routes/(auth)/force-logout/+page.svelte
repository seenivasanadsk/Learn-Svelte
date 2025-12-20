<script>
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import { showToast } from '$lib/stores/toast';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores'; // Import page store
  import { Eye } from 'lucide-svelte';

  // Get URL parameters using $page store
  let username = $state($page.url.searchParams.get('username') || '');

  const { data } = $props();
  let showPassword = $state(false);
  let loading = $state(false);
  let autoFocus = username ? 'password' : 'username';

  function handleForm() {
    loading = true;
    return async ({ result }) => {
      loading = false;
      if (result.type === 'redirect') {
        await goto(result.location, { invalidateAll: true });
      } else if (result.type === 'failure') {
        showToast(result.data.message, 'danger');
      }
    };
  }
</script>

<div class="pt-26 max-w-lg mx-auto">
  <Form
    title="Force Logout"
    action="?/forceLogout"
    method="POST"
    autoComplete="off"
    submitButtonText={['Force Logout']}
    enhance={handleForm}
    {loading}
  >
    <InputField
      placeholder="User"
      name="username"
      bind:value={username}
      options={data.userList}
      autoFocus={autoFocus == 'username'}
      silent={true}
    />
    <InputField
      placeholder="Password"
      name="password"
      value="Admin@123"
      type={!showPassword && 'password'}
      autoFocus={autoFocus == 'password'}
      suffix={Eye}
      caseMode="none"
      onSuffixClick={() => (showPassword = !showPassword)}
    />
  </Form>
</div>
