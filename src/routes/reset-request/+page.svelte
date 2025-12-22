<script>
  import Badge from '$lib/components/Badge.svelte';
  import Button from '$lib/components/Button.svelte';
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import { CircleCheck, Eye, EyeClosed, Hourglass, ShieldCheck } from 'lucide-svelte';

  let showPassword = $state(false);
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
  <Form title="Reset Request">
    {#snippet description()}
      <ol class="my-2 text-amber-600 list-decimal list-outside ml-5" type="1">
        <li>Select your name and request for Reset.</li>
        <li>Any other two users need to review and aprove your request.</li>
        <li>After approved by two user, you can create new password.</li>
      </ol>
    {/snippet}
    <InputField placeholder="Select Username" />

    {@render divider('&#9312;', 'Reset Requested')}

    <div
      class="border-2 rounded-md inline-flex w-full items-center justify-between p-2 border-gray-400 mb-3"
    >
      <div class="flex flex-col">
        <span>Approver 1</span>
        <!-- <span class="text-xs font-medium">Approve to reset password</span> -->
        <!-- <span class="text-xs font-medium">Waiting for approval...</span> -->
        <span class="text-xs font-medium">{new Date().toLocaleString()}</span>
      </div>
      <span>
        <!-- <Badge prefix={Hourglass}>Waiting...</Badge> -->
        <Badge color="success" prefix={ShieldCheck}>Approved</Badge>
        <!-- <Button prefix={CircleCheck} color="primary">Approve</Button> -->
      </span>
    </div>
    <div
      class="border-2 rounded-md inline-flex w-full items-center justify-between p-2 border-gray-400 mb-3"
    >
      <div class="flex flex-col">
        <span>Guna</span>
        <span class="text-xs font-medium">Approve to reset password</span>
        <!-- <span class="text-xs font-medium">Waiting for approval...</span> -->
      </div>
      <span>
        <Button prefix={CircleCheck} color="primary">Approve</Button>
      </span>
    </div>

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
  </Form>
</div>
