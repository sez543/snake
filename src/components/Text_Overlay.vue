<template>
  <div
    v-bind:class="['overlay', { game_over: over }, { start: start }]"
    v-show="!visible ? false : true"
  >
    <div class="top">
      <div class="box">
        <h1 v-if="start">
          Press Start
        </h1>
        <h1 v-if="over">
          Game Over
        </h1>
        <h2 v-if="start">Insert a coin to continue</h2>
      </div>
    </div>
    <div class="middle">
      <div class="box">
        <h1 v-if="start">
          Press Start
        </h1>
        <h1 v-if="over">
          Game Over
        </h1>
        <h2 v-if="start">Insert a coin to continue</h2>
      </div>
    </div>
    <div class="bottom">
      <div class="box">
        <h1 v-if="start">
          Press Start
        </h1>
        <h1 v-if="over">
          Game Over
        </h1>
        <h2 v-if="start">Insert a coin to continue</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TextOverlay",
  props: {
    visible: Boolean,
    start: Boolean,
    over: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/overlay.scss";
</style>
