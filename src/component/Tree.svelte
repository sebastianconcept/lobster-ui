<script>
  import { createEventDispatcher } from "svelte";
  import TreeArrow from "./TreeArrow.svelte";
  const dispatch = createEventDispatcher();

  export let roots;
  export let fetchNodes;
  export let fetchMoreElements;
  // export let onDrag;
  // export let onDrop;

  let lazyElements = {};

  $: {
    roots.forEach(node => (lazyElements[node.id] = node.nodes));
  }

  async function getNodes(node) {
    lazyElements[node.id] = await fetchNodes(node);
    return lazyElements[node.id];
  }

  async function getMoreElements(loadMoreId) {
    return await fetchMoreElements(loadMoreId);
  }

  function onExpanded(event) {
    event.detail.isExpanded = true;
  }

  function onCollapsed(event) {
    event.detail.isExpanded = false;
  }

  function onLabelClick(node) {
    // console.log("onLabelClick", node);
    dispatch("nodeselected", node);
    if (node.loadMoreId) {
      dispatch("loadmoreelements", node);
    }
  }

  function onNodeSelected(event) {
    dispatch("nodeselected", event.detail);
  }

  async function onLoadMore(event, node) {
    const loadMoreId = event.detail.loadMoreId;
    const moreElements = await getMoreElements(loadMoreId);
    lazyElements[node.id].nodes.pop()
    lazyElements[node.id].nodes = lazyElements[node.id].nodes.concat(moreElements);
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
        <li>
          <TreeArrow
            bind:isExpanded={node.isExpanded}
            {node}
            on:expanded={onExpanded}
            on:collapsed={onCollapsed} />
          <div class="node-label" on:click={event => onLabelClick(node)}>
            {node.name} {node.printString}
          </div>
          {#if node.isExpanded}
            {#await getNodes(node) then data}
              {#if data.nodes}
                <svelte:self
                  roots={lazyElements[node.id].nodes}
                  {fetchNodes}
                  {fetchMoreElements}
                  on:nodeselected={onNodeSelected}
                  on:loadmoreelements={event => onLoadMore(event, data)} />
              {/if}
            {/await}
          {/if}
        </li>
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
            <svelte:self
              roots={node.nodes}
              {fetchNodes}
              {fetchMoreElements}
              on:nodeselected={onNodeSelected}
              on:loadmoreelements={event => onLoadMore(event, node)} />
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
{/if}
