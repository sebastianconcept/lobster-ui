<script>
  import { onMount } from "svelte";
  import View from "./../View/index.svelte";
  import Introspector from "./../../component/Introspector.svelte";
  import WorkspaceArea from "./../../component/WorkspaceArea.svelte";

  import { newHash, openView } from "../../utils";
  import {
    sendDoIt,
    sendPrintIt,
    sendInspectIt,
    sendCallback,
    parsed
  } from "./../../bridge";

  export let socket;
  export let id = newHash();
  export let roots = [];
  let inspecteeDisplayString;
  let setSelfObjectId;
  let answer;
  let handshakeOptions;
  let sourceCode = "";
  const protocol = {
    onHandshake,
    onCallback
  };

  // Child views
  let workspace = {
    id: newHash(),
    name: "workspace"
  };

  let introspector = {
    id: newHash(),
    name: "introspector"
  };

  // Setup the handshake with the id of the introspectee
  const params = new URLSearchParams(window.location.search);

  if (!params.has("answer")) {
    throw new Error("Inspector needs the InspectIt answer");
  }

  answer = JSON.parse(params.get("answer"));
  handshakeOptions = {
    inspecteeId: answer.id
  };

  onMount(() => {
    document.title = `Inspector on ${answer.inspecteePrintString}`;
    inspecteeDisplayString = answer.inspecteePrintString;
  });

  function onHandshake(answer) {
    roots = new Array(answer.roots);
    setSelfObjectId = answer.setSelfObjectId;
  }

  function onNodeSelected(event) {
    const node = event.detail;
    inspecteeDisplayString = node.printString
    sendCallback(socket, setSelfObjectId, { references: [node.id] });
  }

  function onCallback(answer) {

  }
</script>

<style>
  .container {
    display: grid;
    height: 100%;
    grid-template-rows: auto 80px;
    grid-template-columns: 30% auto;
    grid-template-areas:
      "tree display"
      "workspace workspace";
  }

  .tree {
    overflow-x: scroll;
    white-space: nowrap;
  }

  .workspace {
    grid-row: 2;
    grid-column: 1 / span 2;
  }
</style>

<div class="container">
  <View
    {id}
    {handshakeOptions}
    {protocol}
    children={{ introspector, workspace }}
    viewType="Inspector"
    bind:socket>
    <div class="tree">
      <Introspector
        id={introspector.id}
        name={introspector.name}
        bind:roots
        on:nodeselected={onNodeSelected} />
    </div>
    <div class="display">
      <div>{inspecteeDisplayString}</div>
    </div>
    <div class="workspace">
      <WorkspaceArea id={workspace.id} name={workspace.name} />
    </div>
  </View>
</div>
