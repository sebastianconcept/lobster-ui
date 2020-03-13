<script>
  export let isExpanded;
  function onClick() {
    isExpanded = !isExpanded;
  }
</script>

<style>
  .container {
    display: inline-block;
    cursor: pointer;
    transform: translate(calc(0px - var(--li-identation)), -50%);
    position: relative;
  }
  .arrow {
    bottom: 0.1em;
    transform-origin: 25% 50%;
    position: relative;
    line-height: 1.1em;
    font-size: 0.75em;
    margin-left: 0;
    transition: 150ms;
    color: var(--arrow-sign);
    user-select: none;
  }
  .isExpanded {
    transform: rotateZ(90deg) translateX(-3px);
  }
</style>

<div class="container" on:click>
  <div class="arrow" class:isExpanded on:click={onClick}>{'\u25B6'}</div>
</div>
