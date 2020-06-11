<script>
  import { createEventDispatcher } from "svelte";
  import { sendIntrospect, sendCallback } from "./../bridge";
  import { Deferred } from "./../utils";
  import View from "./../view/View/index.svelte";
  import Tree from "./Tree.svelte";

  const dispatch = createEventDispatcher();

  export let id;
  export let socket;
  export let name;
  export let roots = [];
  let fetches = {};
  const protocol = {
    // onIntrospect,
    // onCallback
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

  function onNodeSelected(node) {
    dispatch("nodeselected", node);
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
    padding-top: 0.35em;
  }
</style>

<div class="wrapper">
  <p>Classes tree</p>
  <View bind:id {name} {protocol} bind:socket viewType="ClassesHierarchy">
    <div class="content">
      <Tree
        bind:roots
        {fetchNodes}
        on:nodeselected={event => {
          event.stopPropagation();
          onNodeSelected(event.detail);
        }} />
    </div>
  </View>
</div>
