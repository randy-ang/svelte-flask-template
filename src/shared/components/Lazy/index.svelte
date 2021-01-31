<script>
  import { onMount } from "svelte";

  export let component;

  let loadedComponent = null;
  let timeout;

  let props;
  $: {
    const { component, delayMs, ...restProps } = $$props;
    props = restProps;
  }

  onMount(() => {
    component().then((module) => {
      loadedComponent = module.default;
    });

    return () => clearTimeout(timeout);
  });
</script>

{#if loadedComponent}
  <svelte:component this={loadedComponent} {...props} />
{:else}
  <slot />
{/if}
