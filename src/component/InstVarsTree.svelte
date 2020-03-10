<script>
  import { tick } from "svelte";

  import View from "./../view/View/index.svelte";

  export let socket;
  export let id;
  export let name;
</script>

<style>
  div {
    overflow: auto;
    margin: 0 0.3em;
  }
</style>

<div>
  <View {id} {name} bind:socket viewType="InstVarTree">
    <div class="content">
      <div>InstVars tree</div>
    </div>
  </View>

</div>
