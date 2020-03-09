<script>
  import { onMount } from "svelte";
  import { newHash, getServerUrl } from "./../../utils";
  import { createEventDispatcher } from "svelte";
  import { sendViewClosed, sendHandshake } from "./../../bridge";

  const dispatch = createEventDispatcher();

  export const id = newHash();
  export let socket = null;
  export let status = "Disconnected";
  export let viewType = "undefined view type";
  export let handshakeOptions = {};

  function isConnected(webSocket) {
    return webSocket && webSocket.readyState === 1;
  }

  onMount(() => {
    document.title = `Unspecified ${viewType}`;
    socket = connect();
    observeSocket(socket);
    window.onbeforeunload = () => {
      sendViewClosed(socket, id);
    };
  });

  function connect() {
    return !isConnected(socket) ? new WebSocket(getServerUrl()) : socket;
  }

  export const onSocketMessage = message => {
    dispatch("servermessage", message);
  };

  function observeSocket(webSocket) {
    webSocket.addEventListener("open", () => {
      sendHandshake(webSocket, id, viewType, handshakeOptions);
      dispatch("connected", webSocket);
    });

    webSocket.addEventListener("close", () => {
      status = "Disconnected";
    });

    webSocket.addEventListener("error", event => {
      // onSocketError(socket, event);
      status = "Error";
    });

    webSocket.addEventListener("message", event => {
      onSocketMessage(event.data);
    });
  }
</script>

<slot>Waiting for a concrete view to compose this abstract view</slot>
