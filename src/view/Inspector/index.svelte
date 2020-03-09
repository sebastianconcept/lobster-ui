<script>
  import { onMount } from "svelte";
  import View from "./../View/index.svelte";
  import { openView } from "../../utils";
  import { sendDoIt, sendPrintIt, sendInspectIt, parsed } from "./../../bridge";

  export let socket;
  export let id;
  export let answer;
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

<div class="container">
  <View
    bind:id
    on:servermessage={onServerMessage}
    bind:handshakeOptions
    bind:socket
    viewType="Inspector"
    toolName="Inspector">
    <!-- <div class="toolbar">
      <button on:click={onDoIt}>Do It</button>
      <button on:click={onPrintIt}>Print It</button>
      <button on:click={onInspectIt}>Inspect It</button>
    </div> -->

    <h1>Inspector</h1>
    <p>{id}</p>
    {#if answer}
      <p>{answer.id}</p>
      <p>{answer.inspectee}</p>
    {/if}
    <!-- <div class="content">
      <textarea
        id="workspace"
        bind:value={content}
        on:keydown={onKeyDown}
        use:onInputCreated />
    </div> -->
  </View>
</div>
