<script>
  let color = $state('');
  let shade = $state('');

  function testUse(node) {
    $effect(() => {
      console.log('effect run', color, shade);

      // Example of applying the color dynamically
      node.style.backgroundColor = `color-${color}-${shade}`; // or any logic

      // Return cleanup (destroy) function
      return () => {
        console.log('cleanup effect', color, shade);
        node.style.backgroundColor = '';
      };
    });
  }
</script>

<div>
  Your color: {color}-{shade}
  <br />
  <input type="text" bind:value={color} placeholder="red" />
  <input type="text" bind:value={shade} placeholder="500" />

  {#if color && shade}
    <div class="w-5 h-5" use:testUse></div>
  {/if}
</div>
