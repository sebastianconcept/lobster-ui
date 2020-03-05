<script>
  import View from "./../View/index.svelte";
  import TextLines from "./../../component/TextLines.svelte";
  import { sendDoIt, parsed } from "./../../bridge";

  export let socket = null;
  let sourceCode = "";
  let answers = [];
  let commandHistory = [];
  let historyIndex = 0;

  const keyMap = {
    13: onDoIt,
    38: onArrowUp,
    40: onArrowDown
  };

  function onKeyUp(event) {
    keyMap[event.keyCode] ? keyMap[event.keyCode]() : null;
  }

  function onArrowUp() {
    historyPrevious();
  }
  function onArrowDown() {
    historyNext();
  }

  function onDoIt() {
    if (!sourceCode.length) {
      return;
    }
    commandHistory = [...commandHistory, sourceCode];
    sendDoIt(socket, sourceCode);
    updateHistoryIndex();
    sourceCode = "";
  }

  function updateHistoryIndex() {
    historyIndex = commandHistory.length;
  }

  function historyNext() {
    const index = getHistoryIndex();
    console.log(index, commandHistory.length, commandHistory);
    const next = commandHistory[index - 1];
    next ? (sourceCode = next) : null;
    index < commandHistory.length ? (historyIndex = index + 1) : null;
  }

  function historyPrevious() {
    const index = getHistoryIndex();
    console.log(index, commandHistory.length, commandHistory);
    const last = commandHistory[index - 1];
    last ? (sourceCode = last) : null;
    index - 1 >= 0 ? (historyIndex = index - 1) : null;
  }

  function getHistoryIndex() {
    return !historyIndex
      ? (historyIndex = commandHistory.length)
      : historyIndex;
  }

  function onServerMessage(event) {
    const response = parsed(event.detail);
    if (response.messageType === "Handshake" && response.answer) {
      return;
    }
    onREPLResponse(response);
  }

  function onREPLResponse(response) {
    // This apparently redundant assignation is there to help Svelte detect that ansewrs changed
    // https://svelte.dev/tutorial/updating-arrays-and-objects
    answers = [...answers, response.answer];
  }

  function focus(element) {
    element.focus();
  }
</script>

<style>
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

  <View
    let:id
    on:servermessage={onServerMessage}
    bind:socket
    viewType="REPL"
    toolName="REPL">
    <div>
      <TextLines bind:lines={answers} />
    </div>
    <div class="bottom">
      <div class="intro">➜</div>
      <input
        bind:value={sourceCode}
        placeholder="Enter a Smalltalk expression..."
        on:keyup={onKeyUp}
        use:focus />
      <div class="repl-button">
        <button on:click={onDoIt}>DoIt</button>
      </div>
    </div>
  </View>
</div>
