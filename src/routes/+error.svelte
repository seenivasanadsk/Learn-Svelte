<script>
  import { page } from '$app/state';
</script>

<div class="text-center mt-10">
  <h1 class="text-5xl">{page.status} {page.error.message}</h1>
  <span style="font-size: 10em"> Emoji </span>
</div>
