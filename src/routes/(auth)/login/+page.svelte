<script>
  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Form from '$lib/components/Form.svelte';
  import InputField from '$lib/components/InputField.svelte';
</script>

<div class="p-6">
  <Dialog class="rounded-lg">
    {#snippet trigger({ show })}
      <Button onclick={show}>Test</Button>
    {/snippet}

    {#snippet content({ hide })}
      <div>
        <Form title="Login" cancel={hide} rounded="lg">
          <InputField placeholder="User" />
          <InputField placeholder="Password" />
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
