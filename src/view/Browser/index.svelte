<script>
  import View from "./../View/index.svelte";
  import SplitPane from "./../../component/SplitPane.svelte";

  import Classes from "./../../component/Classes.svelte";
  import CategoriesAndVariables from "./../../component/CategoriesAndVariables.svelte";
  import Methods from "./../../component/Methods.svelte";
  import MethodSource from "./../../component/MethodSource.svelte";

  import { onMount } from "svelte";
  import { newHash } from "../../utils";

  export let socket;
  export let id = newHash();

  let classPrintString;
  let answer;
  let handshakeOptions;
  const protocol = {
    onHandshake
  };

  // Child views
  const newChildReference = name => ({
    id: newHash(),
    name: name
  });

  let classes = newChildReference("classes");
  let categoriesAndVairables = newChildReference("categoriesAndVairables");
  let methods = newChildReference("methods");
  let methodSource = newChildReference("methodSource");

  // Setup the handshake with the id of the introspectee
  const params = new URLSearchParams(window.location.search);

  if (!params.has("answer")) {
    throw new Error("Class Hierarchy Browser needs the BrowseIt answer");
  }

  answer = JSON.parse(params.get("answer"));
  console.log("Browser answer from params", answer);
  handshakeOptions = {
    classId: answer.id
  };

  onMount(() => {
    document.title = `Browser on ${answer.classPrintString}`;
    classPrintString = answer.classPrintString;
  });

  function onHandshake(answer) {
    console.log("Browser.onHandshake", answer);
    // roots = new Array(answer.roots);
    // setSelfObjectId = answer.setSelfObjectId;
  }
</script>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .container :global(section) {
    position: relative;
    padding: 42px 0 0 0;
    height: 100%;
    box-sizing: border-box;
  }
  .container :global(section) > :global(*):first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 42px;
    box-sizing: border-box;
  }
  .container :global(section) > :global(*):last-child {
    width: 100%;
    height: 100%;
  }
</style>

<div class="container">
  <View
    {id}
    {handshakeOptions}
    {protocol}
    children={{ classes, categoriesAndVairables, methods, methodSource }}
    viewType="Browser"
    bind:socket>
    <SplitPane type="horizontal" pos="30">
      <section slot="a">
        <Classes id={classes.id} name={classes.name} />
      </section>
      <section slot="b">
        <div class="container">
          <SplitPane type="vertical" pos="50">
            <section slot="a">
              <div class="container">
                <SplitPane type="horizontal" pos="30">
                  <section slot="a">
                    <CategoriesAndVariables
                      id={categoriesAndVairables.id}
                      name={categoriesAndVairables.name} />
                  </section>
                  <section slot="b">
                    <Methods id={methods.id} name={methods.name} />
                  </section>
                </SplitPane>
              </div>
            </section>
            <section slot="b">
              <MethodSource id={methodSource.id} name={methodSource.name} />
            </section>
          </SplitPane>
        </div>
      </section>
    </SplitPane>
  </View>
</div>
