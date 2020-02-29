<script>
  import { onMount } from "svelte";
  import Tool from "./../Tool/index.svelte";

  export let socket = null;
  let message = "";
  let answer = "";

  export const onSocketConnected = socket => {
    console.log("REPL tool connected!");
  };

  function onConnected(event) {
    socket.send("Hello from REPL sir!");
  }

  function onSend() {
    socket.send(message);
  }

  function onServerMessage(event) {
    answer = event.detail;
  }
</script>

<Tool
  let:id
  on:connected={onConnected}
  on:servermessage={onServerMessage}
  bind:socket>
  <h1>REPL</h1>
  <strong>{answer}</strong>
  <input bind:value={message} placeholder="Message to send" />
  <button on:click={onSend}>Send message</button>
</Tool>
