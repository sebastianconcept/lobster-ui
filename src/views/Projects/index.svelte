<script>
  import { createView, getViewUrl } from "../../utils";
  function openTool(selector) {
    const view = createView(getViewUrl(selector));
    view.show();
  }

  function onOpenWorkspace() {
    openTool("workspace");
  }

  function onOpenTranscript() {
    openTool("transcript");
  }
  function onOpenInspector() {
    openTool("inspector");
  }
</script>

<h1>Projects</h1>
<button on:click={onOpenWorkspace}>Open workspace</button>
<button on:click={onOpenTranscript}>Open transcript</button>
<button on:click={onOpenInspector}>Open inspector</button>
