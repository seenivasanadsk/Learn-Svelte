<script>
  import { tick } from 'svelte';
  import { invalidate } from '$app/navigation';
  import Badge from '$lib/components/Badge.svelte';
  import Button from '$lib/components/Button.svelte';
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import { showToast } from '$lib/stores/toast.js';
  import { getFormattedTime } from '$lib/utils/dateTime.js';
  import { CircleCheck, Eye, EyeClosed, Hourglass, ShieldCheck } from 'lucide-svelte';

  let showPassword = $state(false);
  let approvingIndex = $state(null);
  let formElementRef = $state(null);

  const { data } = $props();
  const resetRequest = $derived(data.resetRequest);
  const currentUser = $derived(data.currentUser);
  const users = $derived(data.users);
  const approverCount = $derived(data.approverCount);

  let username = $state('');
  let status = $state('INIT');

  console.log(resetRequest);

  $effect(() => {
    username = resetRequest?.username ?? '';
    status = resetRequest?.status ?? 'INIT';
  });

  async function handleForm({ formData }) {
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    return async ({ result }) => {
      approvingIndex = null;
      if (result?.data?.message) {
        showToast(result.data.message, result.type === 'success' ? 'success' : 'danger');
      }
      await invalidate('reset-request:data');
    };
  }

  async function handleApprovingIndex(e, i) {
    approvingIndex = i;
    await tick();
    e?.target?.closest('form')?.querySelector('button[type=submit]')?.click();
  }
</script>

{#snippet divider(number, text)}
  <div
    class="border-b-2 mb-5 mt-2 -mx-4 border-amber-600 dark:border-amber-800 relative font-semibold text-sm"
  >
    <span
      class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-amber-100 bg-amber-600 dark:bg-amber-900 rounded-md"
    >
      &check; <span class="font-medium text-base">{@html number}</span>
      {text}
    </span>
  </div>
{/snippet}

<div class="h-full p-3 pt-10 max-w-xl mx-auto font-semibold">
  <Form
    title="Reset Request"
    submitButtonText={['Request Reset']}
    method="POST"
    action="?/resetRequest"
    enhance={handleForm}
    autocomplete="off"
    hideSubmitButton={status == 'NEW'}
  >
    {#snippet description()}
      <ol class="my-2 text-amber-600 list-decimal list-outside ml-5" type="1">
        <li>Select your name and request for Reset.</li>
        <li>Any other users need to review and aprove your request.</li>
        <li>After approved by other users, you can create new password.</li>
      </ol>
    {/snippet}
    <input type="hidden" name="status" value={status} />
    <InputField
      placeholder="Select Username"
      options={users || []}
      autoFocus
      name="username"
      readonly={status != 'INIT'}
      bind:value={username}
      silent={true}
    />

    {#if status == 'NEW'}
      {@render divider('&#9312;', 'Reset Requested')}
      {#each Array(approverCount) as _, i}
        {@const approver = resetRequest?.approver[i] || {}}
        <div
          class="border-2 rounded-md inline-flex w-full items-center justify-between p-2 border-gray-400 mb-3"
        >
          <div class="flex flex-col">
            <span>
              {approver?.username || 'Not Approved'}
            </span>
            <span class="text-xs font-medium">
              {(approver?.approvedAt && getFormattedTime(approver?.approvedAt)) ||
                (currentUser ? 'Approve to reset password' : 'Waiting for approval...')}
            </span>
          </div>
          <span>
            {#if approver?.username}
              <Badge color="success" prefix={ShieldCheck}>Approved</Badge>
            {:else if currentUser}
              {#if approvingIndex == i}
                <input type="hidden" name="approvingIndex" value={i} />
              {/if}
              <Button
                prefix={CircleCheck}
                color="primary"
                onclick={(e) => handleApprovingIndex(e, i)}
              >
                {approvingIndex == i ? 'Approving...' : 'Approve'}
              </Button>
            {:else}
              <Badge prefix={Hourglass}>Waiting...</Badge>
            {/if}
          </span>
        </div>
      {/each}
    {/if}

    {#if !1}
      {@render divider('&#9313;', 'Approved')}
      <InputField
        placeholder="New Password"
        type={!showPassword && 'password'}
        suffix={showPassword ? Eye : EyeClosed}
        caseMode="none"
        onSuffixClick={() => (showPassword = !showPassword)}
      />
      <InputField
        placeholder="Confirm Password"
        type={!showPassword && 'password'}
        suffix={showPassword ? Eye : EyeClosed}
        caseMode="none"
        onSuffixClick={() => (showPassword = !showPassword)}
      />
    {/if}
  </Form>
</div>
