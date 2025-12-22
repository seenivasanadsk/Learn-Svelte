<!-- src\routes\(auth)\login\+page.svelte -->
<script>
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import { showToast } from '$lib/stores/toast';
  import { goto } from '$app/navigation';
  import { Eye, EyeClosed } from 'lucide-svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores'; // Import page store
  import Button from '$lib/components/Button.svelte';

  const { data, form } = $props();
  let showPassword = $state(false);
  let loading = $state(false);
  let username = $state(data.lastUsername || '');

  if (form) showToast(form.message, 'danger');
  if (form?.message == 'User already Logged in')
    showToast(
      `Force Logout <b><u><a href="/force-logout?username=${username}">Here</a></u></b>`,
      'primary'
    );

  function triggerFormSubmission(e) {
    e?.target?.closest('form')?.querySelector('button[type=submit]')?.click();
  }
</script>

<div class="pt-26 max-w-lg mx-auto">
  <Form
    title="Login"
    action={`?/login&redirectTo=${$page.url.searchParams.get('redirectTo') || '/'}`}
    method="POST"
    autoComplete="off"
    submitButtonText={['Login']}
    {loading}
  >
    <InputField
      placeholder="User"
      name="username"
      bind:value={username}
      options={data.userList}
      silent={true}
      autoFocus={username !== 'Admin'}
    />
    <InputField
      placeholder="Password"
      name="password"
      value="Admin@123"
      type={!showPassword && 'password'}
      suffix={showPassword ? Eye : EyeClosed}
      caseMode="none"
      onSuffixClick={() => (showPassword = !showPassword)}
      autoFocus={username === 'Admin'}
      onEnter={triggerFormSubmission}
    />
    {#snippet extraButtons()}
      <Button color="cyan" href="reset-request">Forget Password</Button>
    {/snippet}
  </Form>
</div>
