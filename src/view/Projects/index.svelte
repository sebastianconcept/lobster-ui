<script>
  import { onMount } from "svelte";
  import { openTool } from "../../utils";

  onMount(() => (document.title = "Lobster"));

  function onOpenWorkspace() {
    addView(openTool("workspace"));
  }

  function onOpenTranscript() {
    addView(openTool("transcript"));
  }
  function onOpenInspector() {
    addView(openTool("inspector"));
  }

  function onOpenREPL() {
    addView(openTool("REPL"));
  }

  function addView(view) {
    view.on("closed", () => {
      viewClosed();
    });
  }

  function viewClosed() {
    // save the view id somewhere so we can later the server can send us its state
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
  <button on:click={onOpenTranscript}>Open transcript</button>
  <button on:click={onOpenInspector} disabled>Open inspector</button>
  <button on:click={onOpenREPL}>Open REPL</button>
</section>
