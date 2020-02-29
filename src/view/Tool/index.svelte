<script>
  import { onMount } from "svelte";
  import { newHash, getServerUrl } from "./../../utils";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export const id = newHash();
  export let socket = null;
  export let status = "Disconnected";

  function isConnected(socket) {
    return socket && socket.readyState === 1;
  }

  onMount(() => {
    connect();
  });

  function connect() {
    if (!isConnected()) {
      socket = new WebSocket(getServerUrl());
      observeSocket(socket);
      socket.addEventListener("open", () => {
        dispatch("connected", socket);
      });
    }
    return socket;
  }

  export const onSocketMessage = message => {
    dispatch("servermessage", message);
  };

  function observeSocket(socket) {
    socket.addEventListener("close", () => {
      status = "Disconnected";
    });

    socket.addEventListener("error", event => {
      // onSocketError(socket, event);
      status = "Error";
    });

    socket.addEventListener("message", event => {
      onSocketMessage(event.data);
    });
  }
</script>

<h2>Tool</h2>
<slot>Waiting for a concrete tool to compose this abstract tool</slot>
