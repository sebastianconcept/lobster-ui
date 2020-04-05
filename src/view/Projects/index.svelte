<script>
  import { onMount } from "svelte";
  import { openView } from "../../utils";

  onMount(() => (document.title = "Lobster"));

  function onOpenWorkspace() {
    openView("Workspace");
  }

  function onOpenTranscript() {
    openView("Transcript");
  }

  function onOpenREPL() {
    openView("REPL");
  }

  function onOpenBrowser() {
    openView("Browser");
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
  <button on:click={onOpenWorkspace}>Open Workspace</button>
  <button on:click={onOpenTranscript}>Open Transcript</button>
  <button on:click={onOpenREPL}>Open REPL</button>
  <button on:click={onOpenBrowser}>Open Browser</button>
</section>
