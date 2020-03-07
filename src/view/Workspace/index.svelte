<script>
  import { tick, onMount } from "svelte";
  import View from "./../View/index.svelte";

  import { sendDoIt, sendPrintIt, sendInspectIt, parsed } from "./../../bridge";

  export let socket;
  export let content = "\n\n\n\n\n\n\n\n";
  let sourceCode = "";
  let textarea;
  const protocol = {
    DoIt: () => {
      // no-op on do it answers
    },
    PrintIt: onPrintItAnswer,
    DoIt: onDoItAnswer
  };

  const actions = {
    KeyD: onDoIt,
    KeyP: onPrintIt,
    KeyI: onInspectIt
  };

  onMount(() => {
    textarea = document.getElementById("workspace");
  });

  function onServerMessage(event) {
    const response = parsed(event.detail);
    if (response.messageType === "Handshake" && response.answer) {
      return;
    }
    onResponse(response);
  }

  function onDoIt(event) {
    if (!event.metaKey && event.type !== "click") {
      return;
    }
    sourceCode = getSourceCode(textarea);
    sourceCode.length ? sendDoIt(socket, sourceCode) : null;
  }

  function onPrintIt(event) {
    if (!event.metaKey && event.type !== "click") {
      return;
    }
    sourceCode = getSourceCode(textarea);
    sourceCode.length ? sendPrintIt(socket, sourceCode) : null;
  }

  function onInspectIt() {
    sourceCode = getSourceCode(textarea);
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

  function onDoItAnswer(answer) {
    caretToEndOfLine(textarea);
  }

  function onPrintItAnswer(answer) {
    caretToEndOfLine(textarea);
    insertAtCaret(answer, textarea);
  }

  function onKeyDown(event) {
    const action = actions[event.code];
    action ? action(event) : null;
  }

  // Returns the source code either from a specific selection or,
  // when no specific selection is found,
  // it returns the code corresponding to the full line of the caret position.
  function getSourceCode(textarea) {
    const text = getSelectedText(textarea);
    return text.length ? text : getSourceCodeAtCaretPosition(textarea);
  }

  function getSourceCodeAtCaretPosition(textarea) {
    const lineNumber = getCaretLineNumner(textarea);
    return textarea.value.split("\n")[lineNumber - 1];
  }

  function getSelectedText(textarea) {
    // obtain the index of the first selected character
    const start = textarea.selectionStart;
    // obtain the index of the last selected character
    const finish = textarea.selectionEnd;
    // obtain the selected text
    return textarea.value.substring(start, finish);
  }

  function caretToEndOfLine(textarea) {
    const linePosition = getCaretLineNumner(textarea);
    const lines = textarea.value.split("\n").slice(0, linePosition);
    const sizeUpToLineOfCaret = lines.reduce(function(acum, line) {
      return acum + line.length;
    }, 0);
    const remainintToEndOfCurrentLine =
      lines.length + sizeUpToLineOfCaret - textarea.selectionEnd;
    textarea.selectionStart = textarea.selectionEnd =
      textarea.selectionEnd + remainintToEndOfCurrentLine - 1;
  }

  function getCaretLineNumner(textarea) {
    return getTextFullLinesUpToCarent(textarea).length;
  }

  function getTextFullLinesUpToCarent(textarea) {
    return textarea.value.substr(0, textarea.selectionStart).split("\n");
  }

  async function insertAtCaret(text, textarea) {
    const caretPosition = textarea.selectionStart;
    const before = content.substring(0, caretPosition);
    const after = content.substring(textarea.selectionEnd);
    content = before + text + after;
    textarea.focus();
    await tick();
    textarea.selectionStart = caretPosition;
    textarea.selectionEnd = caretPosition + text.length;
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
      <textarea
        id="workspace"
        bind:value={content}
        on:keydown={onKeyDown}
        use:onInputCreated />
    </div>
  </View>
</div>
