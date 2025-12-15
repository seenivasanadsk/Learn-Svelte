<script>
  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Card from '$lib/components/Card.svelte';
</script>

<div class="p-6">
  <Dialog>
    {#snippet trigger({ show })}
      <Button onclick={show}>Test</Button>
    {/snippet}

    {#snippet content()}
      <div class="p-5">
        <Card title="This is test"></Card>
      </div>
    {/snippet}
  </Dialog>
</div>
