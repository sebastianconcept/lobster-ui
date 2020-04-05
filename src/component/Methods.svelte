<script>
  import MethodList from "./MethodList.svelte";
  let filter = "";
  export let methods = []
</script>

<style>

</style>

<div class="classes-wrapper">
  <p>instance | class</p>
  {#if methods.length > 20}
    <div class="search-box">
      <input bind:value={filter} placeholder="Filter..." />
    </div>
  {/if}
  <MethodList></MethodList>
</div>
