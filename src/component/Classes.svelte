<script>
  import ClassesFound from "./ClassesFound.svelte";
  import ClassesHierarchy from "./ClassesHierarchy.svelte";
  import { newHash } from "../utils.js";

  let filter = "";

  // Child views
  const newChildReference = name => ({
    id: newHash(),
    name: name
  });

  let classesHierarchy = newChildReference("classesHierarchy");
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
    <ClassesHierarchy id={classesHierarchy.id} name={classesHierarchy.name} />
  {/if}
</div>
