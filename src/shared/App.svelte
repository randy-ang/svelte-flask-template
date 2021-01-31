<script>
  import { Router } from "svelte-navigator";
  import LazyRoute from "components/LazyRoute/index.svelte";
  import Routes from "./routes";

  export let url = "";
</script>

<svelte:head>
  <title>My Svelte App</title>
</svelte:head>

<h1>hello</h1>
<Router {url}>
  {#each Routes as { path, component }}
    <LazyRoute {path} {component}>
      <h4>Loading...</h4>
    </LazyRoute>
    <!-- <li>
      <a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
        {cat.name}
      </a>
    </li> -->
  {/each}
</Router>
