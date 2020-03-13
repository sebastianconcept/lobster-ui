<script>
  import { onMount } from "svelte";
  import View from "./../View/index.svelte";
  import Introspector from "./../../component/Introspector.svelte";
  import WorkspaceArea from "./../../component/WorkspaceArea.svelte";

  import { newHash, openView } from "../../utils";
  import { sendDoIt, sendPrintIt, sendInspectIt, parsed } from "./../../bridge";

  export let id = newHash();
  export let answer;
  let handshakeOptions;

  "Children";
  let workspace = {
    id: newHash(),
    name: "workspace"
  };

  let introspector = {
    id: newHash(),
    name: "introspector"
  };

  let sourceCode = "";

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
    children={{ introspector, workspace }}
    on:servermessage={onServerMessage}
    viewType="Inspector">
    <div class="tree">
      <Introspector id={introspector.id} name={introspector.name} />
    </div>
    <div class="display">
      <div>{answer.inspecteePrintString}</div>
    </div>
    <div class="workspace">
      <WorkspaceArea id={workspace.id} name={workspace.name} />
    </div>
  </View>
</div>
