<script>
  import { tick } from "svelte";
  export let lines;
  let containerStyle = "max-height: 300px";
  let containerElement;
  window.onresize = event => updateHeight();

  // We need to scroll to the bottom with every change in lines
  // so the last entry appears always at the bottom and
  // the text growss to the top adding scroll bars as necessary.
  // As if it where a chat window.
  $: !!containerElement && lines ? updateHeight() : null;

  async function updateHeight() {
    const howTall = containerElement.parentElement.getBoundingClientRect()
      .height;
    containerStyle = `height: ${howTall}px"`;
    await tick(); // Necessary to prevent scrolling before getting the new content rendered.
    window.scrollTo(0, howTall);
  }

  function initialize(element) {
    containerElement = element;
    updateHeight();
  }
</script>

<style>
  div {
    overflow: auto;
    align-self: end;
    margin: 0 0.3em;
  }
</style>

<div style={containerStyle} use:initialize>
  {#each lines as lineOfText}
    <p>{lineOfText}</p>
  {/each}
</div>
