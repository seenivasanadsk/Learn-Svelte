<script>
  import Button from '$lib/components/Button.svelte';
  import DateField from '$lib/components/DateField.svelte';
  import DateNavigator from '$lib/components/DateNavigator.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import TimeField from '$lib/components/TimeField.svelte';
  import { getFormattedDate } from '$lib/utils/dateTime';
  import { parseDate } from '$lib/utils/dateTimeParser';

  let formData = $state({
    user: '',
    password: '',
    starting: parseDate(getFormattedDate())
  });
</script>

<div class="p-6">
  <Dialog class="rounded-lg">
    {#snippet trigger({ show })}
      <Button onclick={show}>Test</Button>
    {/snippet}

    {#snippet content({ hide })}
      <div>
        <Form title="Login" cancel={hide} rounded="lg">
          <InputField placeholder="User" bind:value={formData.user} />
          <InputField placeholder="Password" bind:value={formData.password} />
          <DateField placeholder="Date" bind:value={formData.starting} />
          <DateNavigator placeholder="Date" bind:value={formData.starting} full />
        </Form>
      </div>
    {/snippet}
  </Dialog>
  <div>
    <Form title="Login" rounded="lg">
      <InputField placeholder="User" />
      <InputField placeholder="Password" />
    </Form>
  </div>
</div>
