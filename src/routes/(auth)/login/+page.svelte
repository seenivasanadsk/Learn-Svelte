<script>
  import InputField from '$lib/components/InputField.svelte';
  import { Key, Eye } from 'lucide-svelte';
  const options = ['seeni', 'vasan', 'sara', 'adsk', 'ramki', 'extra', 'word', 'for', 'this'];
</script>

<div class="p-6">
  <InputField prefix={Eye} {options} newValue="create" suffix={Key} />
  <InputField prefix={Eye} placeholder="Testing" />
  <InputField prefix={Eye} {options} />
</div>
