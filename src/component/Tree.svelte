<script>
  import { createEventDispatcher } from "svelte";
  import TreeArrow from "./TreeArrow.svelte";
  const dispatch = createEventDispatcher();

  export let roots;
  export let fetchNodes;
  let expanded = false;
  // export let onDrag;
  // export let onDrop;
  // export let onClick;

  async function getNodes(node) {
    return await fetchNodes(node);
  }

  function onExpanded(node) {
    expanded = true;
  }

  function onCollapsed(node) {
    expanded = false;
  }

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
      {#if node.nodes && node.nodes === '...'}
        <TreeArrow
          bind:isExpanded={node.isExpanded}
          {node}
          on:expanded={onExpanded}
          on:collapsed={onCollapsed} />
        <div class="node-label" on:click={event => onLabelClick(node)}>
          {node.name} {node.printString}
        </div>
        {#if expanded}
          {#await getNodes(node)}
          {:then data}
            {#if data.nodes}
              <svelte:self roots={data.nodes} {fetchNodes}/>
            {/if}
          {:catch error}
            <p>{error.message}</p>
          {/await}
        {/if}
      {:else}
        <li>
          {#if node.nodes}
            <TreeArrow bind:isExpanded={node.isExpanded} {node} />
          {:else}
            <div class="arrow-padding" />
          {/if}
          <div class="node-label" on:click={event => onLabelClick(node)}>
            {node.name} {node.printString}
          </div>
          {#if node.nodes && node.isExpanded}
            <svelte:self roots={node.nodes} {fetchNodes}/>
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
{/if}
