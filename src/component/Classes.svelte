<script>
  import ClassesFound from "./ClassesFound.svelte";
  import ClassesHierarchy from "./ClassesHierarchy.svelte";

  let filter = "";
</script>

<style>

</style>

<div class="classes-wrapper">
  <div class="search-box">
    <input bind:value={filter} placeholder="Filter by name" />
  </div>

  {#if filter.length > 1}
    <ClassesFound />
  {:else}
    <ClassesHierarchy />
  {/if}
</div>
