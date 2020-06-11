<script context="module">
  import { writable } from "svelte/store";
  let selection = writable(null);
</script>

<script>
  import { createEventDispatcher, onMount } from "svelte";
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
    console.log('Tree roots',roots)
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

  function onNodeSelected(node) {
    selection.set(node.id)
    dispatch("nodeselected", node);
    if (node.loadMoreId) {
      dispatch("loadmoreelements", node);
    }
  }

  async function onLoadMore(event, node) {
    const loadMoreId = event.detail.loadMoreId;
    const moreElements = await getMoreElements(loadMoreId);
    lazyElements[node.id].nodes.pop();
    lazyElements[node.id].nodes = lazyElements[node.id].nodes.concat(
      moreElements
    );
  }
</script>

<style>
  ul {
    list-style: none;
    padding: 0 1.1em 0;
    height: 100%;
  }

  li {
    list-style: none;
  }

  .active {
    background-color: #2d6ad9;
    color: white;
  }

  .node-label {
    display: inline-block;
    height: 100%;
    padding: 0.2em
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
          <div
            class='node-label'
            class:active={$selection === node.id}
            on:click={event => {
              event.stopPropagation();
              onNodeSelected(node);
            }}>
            {node.name} = {node.printString}
          </div>
          {#if node.isExpanded}
            {#await getNodes(node) then data}
              {#if data.nodes}
                <svelte:self
                  roots={lazyElements[node.id].nodes}
                  {fetchNodes}
                  {fetchMoreElements}
                  on:nodeselected={event => {
                    event.stopPropagation();
                    onNodeSelected(event.detail);
                  }}
                  on:loadmoreelements={event => onLoadMore(event, data)} />
              {/if}
            {/await}
          {/if}
        </li>
      {:else}
        <li>
          {#if node.nodes}
            <TreeArrow
              bind:isExpanded={node.isExpanded}
              {node}
              on:expanded={onExpanded}
              on:collapsed={onCollapsed} />
          {:else}
            <div class="arrow-padding" />
          {/if}
          <div
            class='node-label'
            class:active={$selection === node.id}
            on:click={event => {
              event.stopPropagation();
              onNodeSelected(node);
            }}>
            {node.name} = {node.printString}
          </div>
          {#if node.nodes && node.isExpanded}
            <svelte:self
              roots={node.nodes}
              {fetchNodes}
              {fetchMoreElements}
              on:nodeselected={event => {
                event.stopPropagation();
                onNodeSelected(event.detail);
              }}
              on:loadmoreelements={event => onLoadMore(event, node)} />
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
{/if}
