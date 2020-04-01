<script>
  import { tick, onMount } from "svelte";
  import View from "./../view/View/index.svelte";
  import { openView } from "../utils";
  import { sendDoIt, sendPrintIt, sendInspectIt, parsed } from "./../bridge";

  export let socket;
  export let id;
  export let name;
  export let title = "Workspace";

  export let content = "";
  let sourceCode = "";
  let textarea;

  const protocol = {
    onDoIt: () => {
      // no-op on do it answers
    },
    onPrintIt,
    onDoIt,
    onInspectIt
  };

  const actions = {
    KeyD: doIt,
    KeyP: printIt,
    KeyI: inspectIt
  };

  onMount(() => {
    textarea = document.getElementById("workspace");
  });

  function doIt(event) {
    if (!event.metaKey && event.type !== "click") {
      return;
    }
    sourceCode = getSourceCode(textarea);
    sourceCode.length ? sendDoIt(socket, sourceCode) : null;
  }

  function printIt(event) {
    if (!event.metaKey && event.type !== "click") {
      return;
    }
    sourceCode = getSourceCode(textarea);
    sourceCode.length ? sendPrintIt(socket, sourceCode) : null;
  }

  function inspectIt() {
    if (!event.metaKey && event.type !== "click") {
      return;
    }
    sourceCode = getSourceCode(textarea);
    sourceCode.length ? sendInspectIt(socket, sourceCode) : null;
  }

  function onDoIt(answer) {
    caretToEndOfSelection(textarea);
  }

  function onPrintIt(answer) {
    caretToEndOfSelection(textarea);
    insertAtCaret(answer, textarea);
  }

  function onInspectIt(answer) {
    openView("Inspector", { id, answer });
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

  function caretToEndOfSelection(textarea) {
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
    return textarea.value.substr(0, textarea.selectionEnd).split("\n");
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
    height: 100%;
  }
  .content {
    height: 100%;
  }
  .content textarea {
    width: 100%;
    height: 100%;
  }
</style>

<div class="container">
  <View bind:id {name} {title} {protocol} bind:socket viewType="Workspace">
    <div class="content">
      <textarea
        id="workspace"
        bind:value={content}
        on:keydown={onKeyDown}
        use:onInputCreated />
    </div>
  </View>
</div>
