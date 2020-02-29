<script>
  import { onMount } from "svelte";
  import { openTool } from "../../utils";

  onMount(() => (document.title = "Lobster"));

  function onOpenWorkspace() {
    openTool("workspace");
  }

  function onOpenTranscript() {
    openTool("transcript");
  }
  function onOpenInspector() {
    openTool("inspector");
  }

  function onOpenREPL() {
    openTool("REPL");
  }
</script>

<style>
  section {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  h2 {
    margin-top: 0;
  }
</style>

<section>
  <h2>Projects</h2>
  <button on:click={onOpenWorkspace} disabled>Open workspace</button>
  <button on:click={onOpenTranscript} disabled>Open transcript</button>
  <button on:click={onOpenInspector} disabled>Open inspector</button>
  <button on:click={onOpenREPL}>Open REPL</button>
</section>
