<script>
  import { tick } from "svelte";
  import { sendIntrospect, sendCallback } from "./../bridge";
  import { Deferred } from "./../utils";
  import View from "./../view/View/index.svelte";
  import Tree from "./Tree.svelte";

  export let id;
  export let socket;
  export let name;
  export let roots = [];
  let fetches = {};
  const protocol = {
    onIntrospect,
    onCallback
  };

  /**
   * Returs the promise that will have the answer of the introspection of the node.
   * It sends the introspect command to the backend and
   * stores the promise that will resolve with the answer under the node.id
   * so later, whenever its corresponding onIntrospect answer arrives, it will resolve as expected.
   */
  async function fetchNodes(node) {
    sendIntrospect(socket, node);
    fetches[node.id] = new Deferred();
    return fetches[node.id].promise;
  }

  async function fetchMoreElements(loadMoreId) {
    sendCallback(socket, loadMoreId);
    fetches[loadMoreId] = new Deferred();
    return fetches[loadMoreId].promise;
  }

  function onIntrospect(answer) {
    const node = JSON.parse(answer);
    const deferred = fetches[node.id];
    if (!deferred) {
      throw new Error("Promised not found for", node);
    } else {
      deferred.resolve(node);
      delete fetches[node.id];
    }
  }

  function onCallback(answer) {
    const deferred = fetches[answer.loadMoreId];
    if (!deferred) {
      throw new Error("Promised not found for", answer);
    } else {
      deferred.resolve(answer.elements);
      delete fetches[answer.loadMoreId];
    }
  }

  function onNodeSelected(event) {
    // const node = event.detail;
    // if (node.loadMoreId) {
    //   fetchMoreElements(node)
    // }
  }
</script>

<style>
  .wrapper {
    height: 100%;
  }

  .content {
    overflow-x: scroll;
    overflow-y: scroll;
    margin: 0;
    height: 100%;
  }
</style>

<div class="wrapper">
  <View bind:id {name} {protocol} bind:socket viewType="Introspector">
    <div class="content">
      <Tree
        bind:roots
        {fetchNodes}
        {fetchMoreElements}
        on:nodeselected={onNodeSelected} />
    </div>
  </View>
</div>
