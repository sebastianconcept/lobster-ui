<script>
  import { openTool } from "../../utils";

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

<h1>Projects</h1>
<button on:click={onOpenWorkspace}>Open workspace</button>
<button on:click={onOpenTranscript}>Open transcript</button>
<button on:click={onOpenInspector}>Open inspector</button>
<button on:click={onOpenREPL}>Open REPL</button>
