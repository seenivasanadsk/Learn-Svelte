<script>
  import Button from '$lib/components/Button.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import { Key } from 'lucide-svelte';
  import Eye from 'lucide-svelte/icons/Eye';
  const options = ['seeni', 'vasan', 'sara', 'adsk', 'ramki', 'extra', 'word', 'for', 'this'];
</script>

<div class="p-6">
  <Button>fads</Button>
  <InputField prefix={Eye} {options} newValue="create" suffix={Key} />
  <InputField prefix={Eye} placeholder="Testing" />
  <InputField prefix={Eye} {options} />
</div>
