<script>
  import { onMount } from "svelte";
  import { newHash } from "./../../../utils";
  import { isConnected, connect } from "./../../../bridge";

  export const id = newHash();
  export const toolSelector = "repl";
  export let socket = null;
  export let content = "";
  export let self;

  $: onSelf(self);

  function onSelf(component) {
    if (!!component && !isConnected(socket)) {
      socket = connect(component);
      socket.addEventListener("open", () => {
        socket.send("Hello sir!");
      });
    }
  }

  // export const onSocketConnected = socket => {
  //   console.log("REPL connected!");
  // };

  // export const onSocketMessage = message => {
  //   content = message;
  // };
</script>

<h1>REPL</h1>
<p>{content}</p>
