<template>
  <div v-if="mounted" class="board" :class="d">
    <div v-for="(col, i) in board.matrix" :key="i" class="column">
      <div
        v-for="(tiles, index) in col"
        v-bind:class="[
          'tile',
          { body: tiles.Body },
          { fruit: tiles.Fruit },
          { head: tiles.Head },
        ]"
        :key="index"
        :style="cssVarsTile()"
      ></div>
    </div>
  </div>
</template>

<script>
import * as Board from "../assets/scripts/board.js";
import * as Utilities from "../assets/scripts/utilities.js";
import * as Control from "../assets/scripts/control.js";
import * as Game from "../assets/scripts/game.js";

export default {
  name: "Board",
  data: () => {
    return Board.data;
  },
  watch: {
    score: function(new_val) {
      this.$emit("change", new_val);
    },
  },
  created: function() {
    window.addEventListener("resize", () => {
      this.Generate_Board();
    });
    window.addEventListener("keydown", (e) => {
      this.Change_Direction(e.keyCode);
    });
  },
  destroyed: function() {
    window.addEventListener("resize", () => {
      this.Generate_Board();
    });
  },
  mounted() {
    this.Generate_Board();
    this.mounted = true;
  },
  methods: {
    cssVarsTile: Utilities.cssVarsTile,

    Board: Board.Board,
    Generate_Board: Board.Generate_Board,

    Change_Direction: Control.Change_Direction,

    Start: Game.Start,
    Spawn_Fruit: Game.Spawn_Fruit,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/board.scss";
.fruit {
  background-image: url("../assets/media/apple.png");
  background-size: cover;
}
.head {
  background-image: url("../assets/media/head.png");
  background-size: cover;
}
.body:not(.head) {
  background-image: url("../assets/media/tail.png");
  background-size: cover;
}
</style>
