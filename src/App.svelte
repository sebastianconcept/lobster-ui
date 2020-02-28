<script>
  import { onMount } from "svelte";

  import Projects from "./views/Projects/index.svelte";
  import Workspace from "./views/Workspace/index.svelte";
  import Transcript from "./views/Transcript/index.svelte";
  import Inspector from "./views/Inspector/index.svelte";
  import REPL from "./views/REPL/index.svelte";
  import { views, getViewUrl } from "./utils";

  export let url = new URL(location.href);
  let propio;
  let child;

  onMount(() => {});
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <!-- <p>{JSON.stringify(location.href, 0, 2)}</p>
  <strong>{url.hash}</strong> -->
  {#if !url.hash}
    <Projects />
  {:else}
    {#if url.hash === '#workspace'}
      <Workspace />
    {/if}
    {#if url.hash === '#transcript'}
      <Transcript />
    {/if}
    {#if url.hash === '#inspector'}
      <Inspector />
    {/if}
    {#if url.hash === '#REPL'}
      <REPL bind:this={child} self={child} />
    {/if}
  {/if}
</main>
