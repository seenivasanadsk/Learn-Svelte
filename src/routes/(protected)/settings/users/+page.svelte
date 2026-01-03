<script>
  import Button from '$lib/components/Button.svelte';
  import Popover from '$lib/components/Popover.svelte';
</script>

<div class="flex h-full justify-center items-center">
  <Popover position="bottom-right">
    {#snippet trigger()}
      <Button>Testing Numbers</Button>
    {/snippet}
    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae ratione nam eius
      mollitia laboriosam eum. Amet voluptatem voluptate dolore fugiat facilis quibusdam soluta, id
      quae necessitatibus ipsa numquam consectetur obcaecati.
    </div>
  </Popover>
</div>
