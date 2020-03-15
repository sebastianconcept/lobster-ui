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
          nodes: "..."
        },
        {
          name: "anotherInstrospector",
          printString: "an Introspector",
          isExpanded: false,
          nodes: "..."
        },
        {
          name: "stream",
          printString: "a Stream",
          isExpanded: false,
          nodes: [
            {
              name: "contents",
              printString: "a String"
            }
          ]
        },

      ]
    }
  ];

  async function fetchNodes (node) {
    console.log("fetchNodes",node);
    return new Promise(resolve => {
      console.log("fetchNodes resolve");
      resolve({
        ok: true,
        data: {
          nodes: [
            {
              name: "socket",
              printString: "a lazy WebSocket"
            },
            {
              name: "point",
              printString: "a Point",
              isExpanded: false,
              nodes: "..."
            },
            {
              name: "description",
              printString: "a String"
            }
          ]
        }
      });
    });
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
  <View {id} {name} bind:socket viewType="Introspector">
    <div class="content">
      <Tree {roots} {fetchNodes} />
    </div>
  </View>
</div>
