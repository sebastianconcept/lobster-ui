<script>
  import { onMount } from "svelte";
  import View from "./../View/index.svelte";
  import { openView } from "../../utils";
  import { sendDoIt, sendPrintIt, sendInspectIt, parsed } from "./../../bridge";

  export let socket;

  onMount(() => {
    url = new URL(location.href);
    url.searchParams.get("id");
  });

  function onServerMessage() {}
</script>

<div class="container">
  <View
    let:id
    on:servermessage={onServerMessage}
    bind:socket
    viewType="Workspace"
    toolName="Workspace">
    <!-- <div class="toolbar">
      <button on:click={onDoIt}>Do It</button>
      <button on:click={onPrintIt}>Print It</button>
      <button on:click={onInspectIt}>Inspect It</button>
    </div> -->

    <h1>Inspector</h1>

    <!-- <div class="content">
      <textarea
        id="workspace"
        bind:value={content}
        on:keydown={onKeyDown}
        use:onInputCreated />
    </div> -->
  </View>
</div>
