<script>
  import View from "./../View/index.svelte";

  import { sendDoIt, sendPrintIt, sendInspectIt, parsed } from "./../../bridge";

  export let socket;
  export let content = "\n\n\n\n\n\n\n\n";
  let sourceCode = "";
  let caretPosition;
  const protocol = {
    DoIt: () => {
      // no-op on do it answers
    },
    PrintIt: onPrintItAnswer
  };

  function onServerMessage(event) {
    const response = parsed(event.detail);
    if (response.messageType === "Handshake" && response.answer) {
      return;
    }
    onResponse(response);
  }

  function onDoIt() {
    sourceCode = getSelectedText();
    sourceCode.length ? sendDoIt(socket, sourceCode) : null;
  }

  function onPrintIt() {
    sourceCode = getSelectedText() || "";
    caretPosition = document.getElementById("workspace").selectionEnd;
    sourceCode.length ? sendPrintIt(socket, sourceCode) : null;
  }

  function onInspectIt() {
    sourceCode = getSelectedText();
    sourceCode.length ? sendInspectIt(socket, sourceCode) : null;
  }

  function onResponse(response) {
    const reaction = protocol[response.messageType];
    if (reaction) {
      reaction.call(null, response.answer);
    } else {
      throw new Error(`Unsupported message type: ${response.messageType}`);
    }
  }

  function onPrintItAnswer(answer) {
    insertAtCaret(answer);
  }

  function getSelectedText() {
    const input = document.getElementById("workspace");
    // obtain the index of the first selected character
    const start = input.selectionStart;
    // obtain the index of the last selected character
    const finish = input.selectionEnd;
    // obtain the selected text
    return input.value.substring(start, finish);
  }

  function insertAtCaret(text) {
    const input = document.getElementById("workspace");
    const before = content.substring(0, caretPosition);
    const after = content.substring(input.selectionEnd);
    content = before + text + after;
    input.selectionStart = input.selectionEnd = caretPosition + text.length;
    input.focus();
  }

  function onInputCreated(textarea) {
    textarea.focus();
    textarea.setSelectionRange(0, 0);
  }
</script>

<style>
  .container {
    display: grid;
    height: 100%;
    grid-template-rows: 40px auto;
  }

  .content textarea {
    width: 100%;
    height: 100%;
  }

  .toolbar {
    align-self: center;
    justify-self: right;
    padding: 0.5em;
  }
</style>

<div class="container">
  <View
    let:id
    on:servermessage={onServerMessage}
    bind:socket
    viewType="Workspace"
    toolName="Workspace">
    <div class="toolbar">
      <button on:click={onDoIt}>Do It</button>
      <button on:click={onPrintIt}>Print It</button>
      <button on:click={onInspectIt} disabled>Inspect It</button>
    </div>
    <div class="content">
      <textarea id="workspace" bind:value={content} use:onInputCreated />
    </div>
  </View>
</div>
