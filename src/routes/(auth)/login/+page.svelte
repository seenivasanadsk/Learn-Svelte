<!-- src\routes\(auth)\login\+page.svelte -->
<script>
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import { showToast } from '$lib/stores/toast';
  import { goto } from '$app/navigation';
  import { Eye } from 'lucide-svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores'; // Import page store

  const { data } = $props();
  let showPassword = $state(false);
  let loading = $state(false);
  let username = $state(data.lastUsername || '');
  let autoFocus = username ? 'password' : 'username';
  console.log(autoFocus);

  function handleForm() {
    loading = true;
    return async ({ result }) => {
      loading = false;
      if (result.type === 'redirect') {
        await goto(result.location, { invalidateAll: true, replaceState: true });
      } else if (result.type === 'failure') {
        showToast(result.data.message, 'danger');
        if (result.data.message == 'User already Logged in') {
          showToast(
            `Force Logout <b><u><a href="/force-logout?username=${username}">Here</a></u></b>`,
            'primary'
          );
        }
      }
    };
  }
</script>

<div class="pt-26 max-w-lg mx-auto">
  <Form
    title="Login"
    action={`?/login&redirectTo=${$page.url.searchParams.get('redirectTo') || '/'}`}
    method="POST"
    autoComplete="off"
    submitButtonText={['Login']}
    enhance={handleForm}
    {loading}
  >
    <InputField
      placeholder="User"
      name="username"
      bind:value={username}
      options={data.userList}
      silent={true}
      autoFocus={autoFocus === 'username'}
    />
    <InputField
      placeholder="Password"
      name="password"
      value="Admin@123"
      type={!showPassword && 'password'}
      suffix={Eye}
      caseMode="none"
      autoFocus={autoFocus === 'password'}
      onSuffixClick={() => (showPassword = !showPassword)}
    />
  </Form>
</div>
