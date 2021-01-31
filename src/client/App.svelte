<script>
  import { Router } from "svelte-navigator";
  import LazyRoute from "components/LazyRoute/index.svelte";
  const Rand = () =>
    import(/* webpackChunkName: 'rand-view' */ "./routes/Rand/index.svelte");

  export let url = "";
</script>

<svelte:head>
  <title>My Svelte App</title>
</svelte:head>

<h1>hello</h1>
<Router {url}>
  <LazyRoute path="/rand" component={Rand}>
    <h4>Loading...</h4>
  </LazyRoute>
</Router>
