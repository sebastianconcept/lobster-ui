<script>
  import { onMount } from "svelte";
  import { newHash, getServerUrl } from "./../../utils";
  import { createEventDispatcher } from "svelte";
  import { sendViewClosed, sendHandshake } from "./../../bridge";

  const dispatch = createEventDispatcher();

  export let id;
  export let name;
  export let children = [];
  export let socket = null;
  export let handshakeOptions = {};
  export let protocol = {};
  export let status = "Disconnected";
  export let viewType = "undefined view type";
  export let title = `Unspecified ${viewType}`;

  $: {
    // When the protocol set doesn't include a specific onHandshake, then use a default one set here
    !protocol.onHandshake ? (protocol = { ...protocol, onHandshake }) : null;
  }

  function isConnected(webSocket) {
    return webSocket && webSocket.readyState === 1;
  }

  onMount(() => {
    !id ? (id = newHash()) : null;
    document.title = title;
    connect();
  });

  export const connect = function() {
    socket = connectSocket();
    observeSocket(socket);
    window.onbeforeunload = () => {
      sendViewClosed(socket, id);
    };
  };

  function connectSocket() {
    return !isConnected(socket) ? new WebSocket(getServerUrl()) : socket;
  }

  function onHandshake(message) {
    if (message !== true) {
      throw new Error(`Bad hanshake: ${JSON.stringify(message)}`);
    }
  }

  const onSocketMessage = message => {
    dispatch("servermessage", message);
    onServerMessage(message);
  };

  function onServerMessage(message) {
    let parsed = JSON.parse(message);
    parsed.answer = JSON.parse(parsed.answer);
    const reaction = protocol[`on${parsed.messageType}`];
    if (!reaction) {
      throw new Error(
        `Unsupported message type: ${parsed.messageType}. Was on${parsed.messageType} included in the protocol?`
      );
    }
    reaction.call(null, parsed.answer);
  }

  function observeSocket(webSocket) {
    webSocket.addEventListener("open", () => {
      const options = { id, name, children, ...handshakeOptions };
      sendHandshake(webSocket, id, viewType, options);
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
