<template>
  <v-app-bar src="../assets/media/nav.jpg">
    <v-toolbar-title>VueSnake</v-toolbar-title>

    <img class="mx-2" src="../assets/media/snake.svg" alt="" />

    <v-spacer></v-spacer>

    <v-btn
      :disabled="is_locked"
      v-on:click="start"
      class="start_btn mx-2"
      color="primary"
      >Start</v-btn
    >

    <v-spacer></v-spacer>

    <v-toolbar-title>Score: {{ score }}</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-spacer></v-spacer>

    <v-btn v-if="toggle" v-on:click="stop" icon>
      <i class="v-icon fa fa-ban"></i>
    </v-btn>

    <v-btn href="https://github.com/sez543/sez543.github.io" icon>
      <i class="v-icon fa fa-github"></i>
    </v-btn>

    <v-menu
      close-on-click
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon dark v-bind="attrs" v-on="on">
          <i class="v-icon fa fa-bars"></i>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-btn
            block
            :disabled="is_locked"
            v-on:click="start"
            class="mx-2"
            color="primary"
            >Start</v-btn
          >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="full toggle">
          <v-switch
            :disabled="is_locked"
            v-model="toggle"
            v-on:click="pacifist"
            label="Pacifist mode"
          ></v-switch>
        </v-list-item>
        <v-list-item class="apples">
          <v-select
            :disabled="is_locked"
            v-on:change="select_a"
            v-model="apples"
            :items="items"
          ></v-select>
          <div class="a_label">Apples</div>
        </v-list-item>
        <v-list-item class="full slider">
          <div class="list-label">
            Speed
          </div>
          <v-slider
            :disabled="is_locked"
            v-model="slider"
            v-on:change="slide"
            v-on:ready="slide"
            min="0"
            max="100"
          ></v-slider>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    is_locked: Boolean,
    score: Number,
  },
  data: () => {
    return {
      slider: 50,
      toggle: false,
      items: [0, 1, 2, 5, 10, 50],
      apples: 1,
    };
  },
  created: function() {
    window.addEventListener("keydown", () => {
      this.start();
    });
  },
  methods: {
    start: function() {
      if (!this.is_locked) {
        this.$emit("start");
      }
    },
    pacifist: function() {
      this.$emit("toggle", this.toggle);
    },
    select_a: function() {
      this.$emit("apple", this.apples);
    },
    stop: function() {
      this.$emit("stop");
    },
    slide: function() {
      if (!this.is_locked) {
        this.$emit("slide", this.slider);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/nav.scss";
</style>
