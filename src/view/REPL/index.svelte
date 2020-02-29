<script>
  import { onMount } from "svelte";
  import Tool from "./../Tool/index.svelte";
  import { sendDoIt } from "./../../bridge";

  export let socket = null;
  let sourceCode = "";
  let answer = "";

  function onKeyUp(event) {
    event.keyCode === 13 ? onDoIt() : null;
  }

  function onDoIt() {
    sendDoIt(socket, sourceCode);
  }

  function onServerMessage(event) {
    answer = event.detail;
  }
</script>

<Tool
  let:id
  on:servermessage={onServerMessage}
  bind:socket
  viewType="REPL"
  toolName="REPL">
  <h1>REPL</h1>
  <strong>{answer}</strong>
  <input
    bind:value={sourceCode}
    placeholder="Evaluate in Smalltalk..."
    on:keyup={onKeyUp} />
  <button on:click={onDoIt}>DoIt</button>
</Tool>
