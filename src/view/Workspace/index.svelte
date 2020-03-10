<script>
  import WorkspaceArea from "./../../component/WorkspaceArea.svelte";
  import { newHash } from "../../utils";

  let workspace = {
    id: newHash(),
    name: "workspace"
  };
</script>

<style>
  .container {
    height: 100%;
  }
</style>

<div class="container">
  <WorkspaceArea id={workspace.id} name={workspace.name} />
</div>
