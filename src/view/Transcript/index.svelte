<script>
  import View from "./../View/index.svelte";
  import TextLines from "./../../component/TextLines.svelte";
  import { sendViewClosed, parsed } from "./../../bridge";

  export let logs = [];
  let protocol = {
    onTranscriptMessage
  }
  function onClear() {
    logs = [];
  }

  function onTranscriptMessage(event) {
    debugger
    const response = parsed(event.detail);
    if (response.messageType === "Handshake" && response.answer) {
      return;
    }
    if (response.messageType === "TranscriptMessage" && response.payload) {
      logs = [...logs, response.payload];
    }
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
    {protocol}
    viewType="Transcript">
    <div class="toolbar">
      <button on:click={onClear}>Clear</button>
    </div>
    <div class="content">
      <TextLines bind:lines={logs} />
    </div>

  </View>
</div>
