<script>
  import { onMount } from "svelte";
  import { newHash, getServerUrl } from "./../../utils";
  import { createEventDispatcher } from "svelte";
  import { sendHandshake } from "./../../bridge";

  const dispatch = createEventDispatcher();

  export const id = newHash();
  export let socket = null;
  export let status = "Disconnected";
  export let viewType = "undefined view type";
  export let toolName = "Unnamed tool";

  function isConnected(socket) {
    return socket && socket.readyState === 1;
  }

  onMount(() => {
    document.title = toolName;
    connect();
  });

  function connect() {
    if (!isConnected()) {
      socket = new WebSocket(getServerUrl());
      observeSocket(socket);
      socket.addEventListener("open", () => {
        sendHandshake(socket, id, viewType);
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
