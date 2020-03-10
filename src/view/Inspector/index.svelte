<script>
  import { onMount } from "svelte";
  import View from "./../View/index.svelte";
  import InstVarsTree from "./../../component/InstVarsTree.svelte";
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

  let instVarsTree = {
    id: newHash(),
    name: "instVarTree"
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

  .workspace {
    grid-row: 2;
    grid-column: 1 / span 2;
  }
</style>

<div class="container">
  <View
    {id}
    {handshakeOptions}
    children={{ instVarsTree, workspace }}
    on:servermessage={onServerMessage}
    viewType="Inspector">
    <!-- <div class="toolbar">
      <button on:click={onDoIt}>Do It</button>
      <button on:click={onPrintIt}>Print It</button>
      <button on:click={onInspectIt}>Inspect It</button>
    </div> -->

    <div class="tree">
      <InstVarsTree id={instVarsTree.id} name={instVarsTree.name} />
    </div>
    <div class="display">
      <div>{answer.inspectee}</div>
    </div>
    <div class="workspace">
      <WorkspaceArea id={workspace.id} name={workspace.name} />
    </div>
  </View>
</div>
