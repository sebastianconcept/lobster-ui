<script>
  import { onMount } from "svelte";
  import View from "./../View/index.svelte";
  import WorkspaceArea from "./../../component/WorkspaceArea.svelte";

  import { openView } from "../../utils";
  import { sendDoIt, sendPrintIt, sendInspectIt, parsed } from "./../../bridge";

  export let socket;
  export let id;
  export let answer;
  let sourceCode = "";
  let handshakeOptions;

  const params = new URLSearchParams(window.location.search);
  if (!params.has("answer")) {
    throw new Error("Inspector needs the InspectIt answer");
  }
  answer = JSON.parse(params.get("answer"));
  handshakeOptions = {
    inspecteeId: answer.id
  };

  onMount(() => {
    document.title = `Inspector on ${answer.inspectee}`;
  });

  function onServerMessage() {}
</script>

<style>
  .container {
    display: grid;
    height: 100%;
    grid-template-rows: auto 80px;
    grid-template-columns: 30% auto;
    grid-template-areas:
      "tree display"
      "workspace workspace";
  }

  .workspace {
    grid-row: 2;
    grid-column: 1 / span 2;
  }

  .workspace textarea {
    width: 100%;
    height: 100%;
  }
</style>

<div class="container">
  <View
    bind:id
    on:servermessage={onServerMessage}
    bind:handshakeOptions
    bind:socket
    viewType="Inspector">
    <!-- <div class="toolbar">
      <button on:click={onDoIt}>Do It</button>
      <button on:click={onPrintIt}>Print It</button>
      <button on:click={onInspectIt}>Inspect It</button>
    </div> -->

    <div class="tree">
      <p>tree</p>
    </div>
    <div class="display">
      <p>{answer.inspectee}</p>
    </div>
    <div class="workspace">
      <WorkspaceArea />
    </div>

    <!-- <div class="content">
      <textarea
        id="workspace"
        bind:value={content}
        on:keydown={onKeyDown}
        use:onInputCreated />
    </div> -->
  </View>
</div>
