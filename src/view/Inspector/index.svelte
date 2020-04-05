<script>
  import { onMount } from "svelte";
  import View from "./../View/index.svelte";
  import Introspector from "./../../component/Introspector.svelte";
  import WorkspaceArea from "./../../component/WorkspaceArea.svelte";
  import SplitPane from "./../../component/SplitPane.svelte";

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
    inspecteeDisplayString = node.printString;
    sendCallback(socket, setSelfObjectId, { references: [node.id] });
  }

  function onCallback(answer) {}
</script>

<style>
  .wrapper {
    height: 100%;
  }

  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .container :global(section) {
    position: relative;
    padding: 42px 0 0 0;
    height: 100%;
    box-sizing: border-box;
  }
  .container :global(section) > :global(*):first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 42px;
    box-sizing: border-box;
  }
  .container :global(section) > :global(*):last-child {
    width: 100%;
    height: 100%;
  }

  .workspace {
    height: 100%;
  }

  .display {
    padding: 0.5em 1em;
  }
</style>

<div class="wrapper">
  <View
    {id}
    {handshakeOptions}
    {protocol}
    children={{ introspector, workspace }}
    viewType="Inspector"
    bind:socket>
    <div class="container">
      <SplitPane type="vertical" pos="80">
        <section slot="a">
          <div class="inspection">
            <SplitPane type="horizontal" pos="30">
              <section slot="a">
                <Introspector
                  id={introspector.id}
                  name={introspector.name}
                  bind:roots
                  on:nodeselected={onNodeSelected} />
              </section>
              <section slot="b">
                <div class="display">
                  <div>{inspecteeDisplayString}</div>
                </div>
              </section>
            </SplitPane>
          </div>
        </section>
        <section slot="b" style="height: 100%">
          <div class="workspace">
            <WorkspaceArea id={workspace.id} name={workspace.name} />
          </div>
        </section>
      </SplitPane>
    </div>
  </View>
</div>
