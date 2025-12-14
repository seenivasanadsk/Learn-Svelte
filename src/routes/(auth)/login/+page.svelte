<script>
  import InputField from '$lib/components/InputField.svelte';
  import { timeAgo, timeAgoSmart } from '$lib/utils/relativeTime';

  // import { Key, Eye } from 'lucide-svelte';
  const options = ['seeni', 'vasan', 'sara', 'adsk', 'ramki', 'extra', 'word', 'for', 'this'];

  async function handleCreateOption() {
    return new Promise((r) =>
      setTimeout(() => {
        r(false);
      }, 2000)
    );
  }

  console.log(timeAgoSmart(new Date(2025, 11, 12, 10, 30)));
</script>

<div class="p-6">
  <InputField {options} newValue="create" createOption={handleCreateOption} />
  <InputField placeholder="Testing" />
  <InputField {options} />
</div>
