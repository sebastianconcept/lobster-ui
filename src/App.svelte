<script>
  import { onMount } from "svelte";

  import Projects from "./view/Projects/index.svelte";
  import Workspace from "./view/Workspace/index.svelte";
  import Transcript from "./view/Transcript/index.svelte";
  import Inspector from "./view/Inspector/index.svelte";
  import REPL from "./view/REPL/index.svelte";
  import { views, getViewUrl } from "./utils";

  export let url = new URL(location.href);
  let propio;
  let child;

  onMount(() => {});
</script>

<style>
  main {
    height: 100%;
  }
</style>

<main>
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
      <!-- <REPL bind:this={child} self={child} /> -->
      <REPL />
    {/if}
  {/if}
</main>
