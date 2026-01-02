<script>
  const { trigger, children, class: userClass = '' } = $props();
</script>

<div class="relative">
  {@render trigger()}
  <div class="w-md bg-white p-2 rounded-md shadow dark:bg-amber-950/50 absolute {userClass}">
    {@render children()}
  </div>
</div>
