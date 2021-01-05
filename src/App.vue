<template>
  <v-app>
    <TextOverlay :visible="visible" :start="s" :over="over"></TextOverlay>
    <Navigation
      :is_locked="is_locked"
      :score="score"
      v-on:start="start"
      v-on:stop="stop"
      v-on:toggle="toggle"
      v-on:apple="apple"
      v-on:slide="slide"
    ></Navigation>
    <Board v-on:change="score_change" ref="Board"></Board>
    <Dpad v-on:redirect="redirect"></Dpad>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Board from "@/components/Board.vue";
import Dpad from "@/components/Dpad.vue";
import TextOverlay from "@/components/Text_Overlay.vue";
// import Modal from "./components/Modal.vue";

export default {
  name: "App",

  components: {
    Navigation,
    Board,
    Dpad,
    TextOverlay,
    // Modal,
  },

  data: () => {
    return {
      is_locked: false,
      score: 0,
      visible: true,
      over: false,
      s: true,
    };
  },
  methods: {
    start: async function() {
      this.is_locked = true;
      this.visible = false;
      this.s = false;
      this.over = true;
      await this.$refs.Board.Start();
      this.is_locked = false;
      this.visible = true;
    },
    stop: function() {
      this.$refs.Board.is_running = false;
    },
    toggle: function(val) {
      this.$refs.Board.pacifist = val;
    },
    apple: function(val) {
      this.$refs.Board.apples = val;
    },
    slide: function(val) {
      this.$refs.Board.speed = 180 - val;
    },
    score_change: function(val) {
      this.score = val;
    },
    redirect: function(val) {
      if (!this.is_locked) {
        this.start();
      }
      if (this.$refs.Board.can_turn) {
        switch (val) {
          case "up":
            if (this.$refs.Board.direction != this.$refs.Board.down) {
              this.$refs.Board.direction = this.$refs.Board.up;
              this.$refs.Board.d = "up";
            }
            break;
          case "down":
            if (this.$refs.Board.direction != this.$refs.Board.up) {
              this.$refs.Board.direction = this.$refs.Board.down;
              this.$refs.Board.d = "down";
            }
            break;
          case "left":
            if (this.$refs.Board.direction != this.$refs.Board.right) {
              this.$refs.Board.direction = this.$refs.Board.left;
              this.$refs.Board.d = "left";
            }
            break;
          case "right":
            if (this.$refs.Board.direction != this.$refs.Board.left) {
              this.$refs.Board.direction = this.$refs.Board.right;
              this.$refs.Board.d = "right";
            }
            break;
        }
        this.$refs.Board.can_turn = false;
      }
    },
  },
};
</script>

<style lang="scss">
.v-application--wrap {
  align-items: center;
}
.v-toolbar__title {
  font-size: 1.25em;
}
html {
  overflow-y: auto;
  font-family: "Fira Code", monospace;
  font-size: 20px;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
