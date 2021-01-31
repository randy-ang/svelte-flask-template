<script>
  let rand = -1;

  function getRand() {
    fetch("/api/v1/rand")
      .then((d) => d.text())
      .then((d) => (rand = d));
  }
</script>

<svelte:head>
  <title>My Svelte App</title>
</svelte:head>

<h1>Your number is {rand}!</h1>
<button on:click={getRand}>Get a random number</button>

<style>
  h1 {
    font-size: 18px;
  }
</style>
