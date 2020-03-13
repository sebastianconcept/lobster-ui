<script>
  import { tick } from "svelte";

  import View from "./../view/View/index.svelte";
  import Tree from "./Tree.svelte";

  export let socket;
  export let id;
  export let name;

  const roots = [
    {
      name: "self",
      printString: "an Inspector",
      isExpanded: true,
      nodes: [
        {
          name: "workspace",
          printString: "a Workspace",
          isExpanded: false,
          nodes: [
            {
              name: "socket",
              printString: "a WebSocket"
            }
          ]
        },
        {
          name: "instrospector",
          printString: "an Introspector",
          isExpanded: false,
          nodes: [
            {
              name: "socket",
              printString: "a WebSocket"
            }
          ]
        }
      ]
    }
  ];
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
  <View {id} {name} bind:socket viewType="Introspector">
    <div class="content">
      <Tree {roots} />
    </div>
  </View>
</div>
