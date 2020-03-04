<script>
  import { onDestroy } from "svelte";
  import View from "./../View/index.svelte";
  import TextLines from "./../../component/TextLines.svelte";
  import { sendViewClosed, parsed } from "./../../bridge";

  export let logs = [];
  export let socket;

  function onClear() {
    logs = [];
  }

  function onServerMessage(event) {
    const response = parsed(event.detail);
    if (response.messageType === "Handshake" && response.answer) {
      return;
    }
    if (response.messageType === "TranscriptMessage" && response.payload) {
      // This apparently redundant assignation is there to help Svelte detect that ansewrs changed
      // https://svelte.dev/tutorial/updating-arrays-and-objects
      logs = [...logs, response.payload];
    }
  }

  function onUnload(event) {
    debugger;
  }
</script>

<style>
  .container {
    display: grid;
    height: 100%;
    grid-template-rows: 40px auto;
  }

  .toolbar {
    align-self: center;
    justify-self: right;
    padding: 0.5em;
  }

  .content {
    height: 100%;
  }
</style>

<div class="container">

  <View
    let:id
    on:servermessage={onServerMessage}
    bind:socket
    viewType="Transcript"
    toolName="Transcript">
    <div class="toolbar">
      <button on:click={onClear}>Clear</button>
    </div>
    <div class="content">
      <TextLines bind:lines={logs} />
    </div>

  </View>
</div>
