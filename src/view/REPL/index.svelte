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
    sourceCode = "";
  }

  function onServerMessage(event) {
    answer = event.detail;
  }
</script>

<style>
  h1 {
    color: green;
  }

  .container {
    display: grid;
    height: 100%;
    grid-template-rows: auto 40px;
  }

  .bottom {
    display: grid;
    grid-template-columns: 1.5em auto 4em;
    padding-bottom: 0.3em;
  }

  .intro {
    align-self: center;
    justify-self: center;
  }

  .repl-button {
    align-self: center;
    justify-self: center;
    height: 100%;
  }
  .repl-button button {
    height: 100%;
  }
  input {
    grid-column-start: 2;
    padding: 0.3em;
  }
</style>

<div class="container">

  <Tool
    let:id
    on:servermessage={onServerMessage}
    bind:socket
    viewType="REPL"
    toolName="REPL">
    <div>
      <h1>REPL</h1>
      <strong>{answer}</strong>
    </div>
    <div class="bottom">
      <div class="intro">➜</div>
      <input
        bind:value={sourceCode}
        placeholder="Enter a Smalltalk expression..."
        on:keyup={onKeyUp} />
      <div class="repl-button">
        <button on:click={onDoIt}>DoIt</button>
      </div>
    </div>
  </Tool>
</div>
