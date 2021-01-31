<script>
  import { Route } from "svelte-navigator";
  import Lazy from "components/Lazy/index.svelte";

  export let component;

  let props;
  $: {
    const { component, ...restProps } = $$props;
    props = restProps;
  }
</script>

<Route {...props}>
  <Lazy {component}>
    <slot />
  </Lazy>
</Route>
