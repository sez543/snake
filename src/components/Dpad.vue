<template>
  <div class="pad">
    <v-btn color="pink darken-2" v-on:click="go_up" fab>
      <i class="v-icon fa fa-arrow-up"></i>
    </v-btn>
    <div class="sides">
      <v-btn color="pink darken-2" v-on:click="go_left" fab>
        <i class="v-icon fa fa-arrow-left"></i>
      </v-btn>
      <v-btn color="pink darken-2" v-on:click="go_right" fab>
        <i class="v-icon fa fa-arrow-right"></i>
      </v-btn>
    </div>
    <v-btn color="pink darken-2" v-on:click="go_down" fab>
      <i class="v-icon fa fa-arrow-down"></i>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "Dpad",
  methods: {
    emit: function(d) {
      this.$emit("redirect", d);
    },
    go_up: function() {
      this.emit("up");
    },
    go_down: function() {
      this.emit("down");
    },
    go_left: function() {
      this.emit("left");
    },
    go_right: function() {
      this.emit("right");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/dpad.scss";
</style>
