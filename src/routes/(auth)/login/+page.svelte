<script>
  import Button from '$lib/components/Button.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import Eye from 'lucide-svelte/icons/Eye';
</script>

<div class="p-6">
  <Button>fads</Button>
  <InputField prefix={Eye} />
  <InputField prefix={Eye} />
  <InputField prefix={Eye} />
</div>
