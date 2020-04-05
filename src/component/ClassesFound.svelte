<script>
    import { createEventDispatcher, onMount } from "svelte";
// import List from "./List.svelte";

  const dispatch = createEventDispatcher();

  export let id;
  export let socket;
  export let name;
  export let roots = [];
  let fetches = {};
  const protocol = {
    // onIntrospect,
    // onCallback
  };

</script>

<style>
</style>

<div class="wrapper">
  <p>List of matching classes</p>
</div>
