<script>
  import { onMount } from "svelte";

  import Projects from "./view/Projects/index.svelte";
  import Workspace from "./view/Workspace/index.svelte";
  import Transcript from "./view/Transcript/index.svelte";
  import Inspector from "./view/Inspector/index.svelte";
  import REPL from "./view/REPL/index.svelte";
  import Browser from "./view/Browser/index.svelte";
  import { views, getViewUrl } from "./utils";

  export let url = new URL(location.href);
  let propio;
  let child;

  onMount(() => {});

  function isForViewType(viewTypeName) {
    return url.searchParams.get("viewType") === viewTypeName;
  }
</script>

<style>
  main {
    height: 100%;
  }
</style>

<main>
  {#if !url.searchParams.has('viewType')}
    <Projects />
  {:else}
    {#if isForViewType('Workspace')}
      <Workspace />
    {/if}
    {#if isForViewType('Transcript')}
      <Transcript />
    {/if}
    {#if isForViewType('Inspector')}
      <Inspector />
    {/if}
    {#if isForViewType('REPL')}
      <!-- <REPL bind:this={child} self={child} /> -->
      <REPL />
    {/if}
    {#if isForViewType('Browser')}
      <Browser />
    {/if}
  {/if}
</main>
