<script>
  // --- Typewriter transition defined inside the component ---
  function typewriter(node, { speed = 50 } = {}) {
    const text = node.textContent;
    const length = text.length;

    return {
      duration: length * speed,
      tick: (t) => {
        const i = Math.trunc(length * t);
        node.textContent = text.slice(0, i);
      }
    };
  }

  // --- App state ---
  let i = 0;
  const messages = ['Hello there!', 'Welcome to Svelte!', 'Transitions are powerful!'];

  function next() {
    i = (i + 1) % messages.length;
  }
</script>

<button on:click={next}>Next message</button>

<!-- KEY BLOCK → forces the transition to replay -->
{#key i}
  <p in:typewriter={{ speed: 30 }}>
    {messages[i]}
  </p>
{/key}

<style>
  p {
    font-size: 1.4rem;
    font-family: monospace;
    margin: 1rem 0;
  }
</style>
