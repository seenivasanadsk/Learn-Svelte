<script>
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import { showToast } from '$lib/stores/toast';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores'; // Import page store
  import { Eye, EyeClosed } from 'lucide-svelte';

  // Get URL parameters using $page store
  let username = $state($page.url.searchParams.get('username') || '');

  const { data, form } = $props();
  let showPassword = $state(false);
  let loading = $state(false);
  let autoFocus = username ? 'password' : 'username';

  if (form) showToast(form.message, 'danger');

  function triggerFormSubmission(e) {
    e?.target?.closest('form')?.querySelector('button[type=submit]')?.click();
  }
</script>

<div class="pt-26 max-w-lg mx-auto">
  <Form
    title="Force Logout"
    action="?/forceLogout"
    method="POST"
    autoComplete="off"
    submitButtonText={['Force Logout']}
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
      onEnter={triggerFormSubmission}
    />
  </Form>
</div>
