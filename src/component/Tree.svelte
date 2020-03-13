<script>
  import { createEventDispatcher } from "svelte";
  import TreeArrow from "./TreeArrow.svelte";
  const dispatch = createEventDispatcher();

  export let roots;
  // export let onDrag;
  // export let onDrop;
  // export let onClick;

  function onLabelClick(node) {
    dispatch("nodeselected", node);
  }
</script>

<style>
  ul {
    list-style: none;
    padding: 0.35em 0 0.35em 1em;
    height: 100%;
  }

  li {
    list-style: none;
  }

  .node-label {
    display: inline-block;
    height: 100%;
  }
  .arrow-padding {
    width: 1em;
  }
</style>

{#if roots && roots.length}
  <ul>
    {#each roots as node}
      <li>
        {#if node.nodes}
          <TreeArrow bind:isExpanded={node.isExpanded} />
        {:else}
          <div class="arrow-padding" />
        {/if}
        <div class="node-label" on:click={event => onLabelClick(node)}>
          {node.name} {node.printString}
        </div>
        {#if node.nodes && node.isExpanded}
          <svelte:self roots={node.nodes} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}
