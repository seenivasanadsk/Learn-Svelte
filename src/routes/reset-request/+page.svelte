<script>
  import { invalidate, goto } from '$app/navigation';
  import { tick } from 'svelte';

  import Badge from '$lib/components/Badge.svelte';
  import Button from '$lib/components/Button.svelte';
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';

  import { showToast } from '$lib/stores/toast.js';
  import { getFormattedTimeStamp } from '$lib/utils/dateTime.js';
  import { timeAgoSmart } from '$lib/utils/relativeTime.js';

  import { CircleCheck, Eye, EyeClosed, Hourglass, ShieldCheck } from 'lucide-svelte';

  /* -------------------------------------
   * Props (server data)
   * ----------------------------------- */
  const { data } = $props();

  const resetRequest = $derived(data.resetRequest);
  const currentUser = $derived(data.currentUser);
  const users = $derived(data.users);
  const approverCount = $derived(data.approverCount ?? 0);

  /* -------------------------------------
   * Server-driven state
   * ----------------------------------- */
  const status = $derived(resetRequest?.status ?? 'INIT');
  const username = $derived(resetRequest?.username ?? '');

  /* -------------------------------------
   * Local UI state
   * ----------------------------------- */
  let showPassword = $state(false);
  let approvingIndex = $state(null);
  let cancelRequest = $state(false);
  let form = $state(null);

  let newPassword = $state('');
  let confirmPassword = $state('');

  /* -------------------------------------
   * Derived UI logic
   * ----------------------------------- */
  const isRequester = $derived(currentUser?.id === resetRequest?.userId);

  const isAlreadyApproved = $derived(
    resetRequest?.approver?.some((a) => a?.id === currentUser?.id) ?? false
  );

  const isSamePassword = $derived(newPassword !== '' && newPassword === confirmPassword);

  const approvers = $derived(Array.from({ length: approverCount }));

  /* -------------------------------------
   * Form handling
   * ----------------------------------- */
  function handleForm() {
    return async ({ result }) => {
      approvingIndex = null;
      cancelRequest = false;

      if (result?.data?.message) {
        showToast(result.data.message, result.type === 'success' ? 'success' : 'danger');
      }

      if (result.type === 'success' && status === 'APPROVED') {
        goto('/login');
      } else {
        await invalidate('reset-request:data');
      }
    };
  }

  async function approve(index) {
    approvingIndex = index;
    await tick();
    form.submit();
  }

  async function cancel() {
    cancelRequest = true;
    await tick();
    form.submit();
  }
</script>

{#snippet divider(number, text)}
  <div
    class="border-b-2 mb-5 mt-2 -mx-4 border-amber-600 dark:border-amber-800 relative font-semibold text-sm"
  >
    <span
      class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-amber-100 bg-amber-600 dark:bg-amber-900 rounded-md"
    >
      ✓ <span class="font-medium text-base">{@html number}</span>
      {text}
    </span>
  </div>
{/snippet}

<div class="h-full p-3 pt-10 max-w-xl mx-auto font-semibold">
  <Form
    title="Reset Request"
    method="POST"
    action="?/resetRequest"
    enhance={handleForm}
    autocomplete="off"
    submitButtonText={[status === 'APPROVED' ? 'Change Password' : 'Request Reset']}
    hideSubmitButton={status !== 'INIT' && !isSamePassword}
    bind:this={form}
  >
    {#snippet extraButtons()}
      {#if status !== 'INIT' && currentUser?.id}
        {#if cancelRequest}
          <input type="hidden" name="cancelRequest" value="YES" />
        {/if}
        <Button onclick={cancel}>Cancel Request</Button>
      {/if}
    {/snippet}

    {#snippet description()}
      <ol class="my-2 text-amber-600 list-decimal ml-5">
        <li>Select your name and request for reset.</li>
        <li>Other users must approve your request.</li>
        <li>After approval, you can change your password.</li>
      </ol>
    {/snippet}

    <input type="hidden" name="status" value={status} />

    <InputField
      name="username"
      placeholder="Select Username"
      options={users}
      readonly={status !== 'INIT'}
      value={username}
      silent
      autoFocus
    />

    {#if status !== 'INIT'}
      {@render divider('①', 'Reset Requested')}

      {#each approvers as _, i}
        {@const approver = resetRequest?.approver?.[i]}

        <div
          class="border-2 rounded-md flex justify-between items-center p-2 mb-3
          {approver?.id && 'text-green-600'}"
        >
          <div class="flex flex-col">
            <span class="flex gap-2 items-center">
              {#if approver}
                <CircleCheck size={18} />
                {approver.id === currentUser?.id ? `You (${approver.username})` : approver.username}
              {:else}
                Not Approved
              {/if}
            </span>

            <span
              class="text-xs"
              title={approver?.approvedAt && getFormattedTimeStamp(approver.approvedAt)}
            >
              {approver?.approvedAt
                ? timeAgoSmart(approver.approvedAt)
                : isRequester
                  ? `Can't approve your own request`
                  : 'Approve to reset password'}
            </span>
          </div>

          {#if approver}
            <Badge color="success" prefix={ShieldCheck}>Approved</Badge>
          {:else if currentUser && !isRequester}
            <Button prefix={CircleCheck} disabled={isAlreadyApproved} onclick={() => approve(i)}>
              {approvingIndex === i ? 'Approving…' : 'Approve'}
            </Button>

            {#if approvingIndex === i}
              <input type="hidden" name="approvingIndex" value={i} />
            {/if}
          {:else}
            <Badge prefix={Hourglass}>Waiting…</Badge>
          {/if}
        </div>
      {/each}
    {/if}

    {#if status === 'APPROVED' && (resetRequest?.userId === currentUser?.id || !currentUser?.id)}
      <!-- For spacing -->
      <div class="mt-5"></div>

      {@render divider('②', 'Approved')}

      <InputField
        name="newPassword"
        placeholder="New Password"
        type={showPassword ? 'text' : 'password'}
        suffix={showPassword ? Eye : EyeClosed}
        bind:value={newPassword}
        caseMode="none"
        onSuffixClick={() => (showPassword = !showPassword)}
      />

      <InputField
        name="confirmPassword"
        placeholder="Confirm Password"
        type={showPassword ? 'text' : 'password'}
        suffix={showPassword ? Eye : EyeClosed}
        bind:value={confirmPassword}
        caseMode="none"
        onSuffixClick={() => (showPassword = !showPassword)}
      />
    {/if}
  </Form>
</div>
