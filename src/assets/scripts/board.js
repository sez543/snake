export var data = {
  width: null,
  board: null,
  mounted: false,
  direction: null,
  d: "right",
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
  constant_true: true,
  is_running: false,
  score: 0,
  speed: 150,
  can_turn: true,
};

export const Board = function(y, x) {
  this.y = y;
  this.x = x;
  this.matrix = new Array(y);
  for (var i = 0; i < y; i++) {
    this.matrix[i] = new Array(x);
    for (var j = 0; j < x; j++) {
      this.matrix[i][j] = {
        Empty: true,
        Head: false,
        Body: false,
        Friut: false,
      };
    }
  }
  this.Snake = function(y, x) {
    this.head = {
      x: x,
      y: y,
    };
    this.size = 1;
    this.body = [[y, x]];
  };
  var center_x = Math.floor(x / 2);
  var center_y = Math.floor(y / 2);
  this.snake = new this.Snake(center_y, center_x);
  this.h_y = center_y;
  this.h_x = center_x;
  this.matrix[center_y][center_x].Body = true;
  this.matrix[center_y][center_x].Head = true;
};

export const Generate_Board = function() {
  var h = document.querySelector(".v-toolbar").scrollHeight;
  var width = 25;
  var height = 25;
  var margin_x = 40;
  var margin_y = 20;
  var top = document.querySelector(".top");
  var middle = document.querySelector(".middle");
  var bottom = document.querySelector(".bottom");
  var t = Math.floor(
    (window.innerHeight -
      25 * Math.floor((window.innerWidth - margin_x) / width)) /
      2 -
      h -
      20
  );
  var str = `top: -${t}px`;
  top.setAttribute("style", str);
  middle.setAttribute("style", str);
  bottom.setAttribute("style", str);
  if (window.innerWidth <= 900) {
    margin_x = 0;
  }
  if (innerWidth - margin_x > window.innerHeight - h - margin_y) {
    this.width = Math.floor((window.innerHeight - margin_y - h) / height);
    var strech = Math.floor((window.innerWidth - margin_x) / this.width + 1);
    this.board = new this.Board(height, strech);
  } else {
    this.width = Math.floor((window.innerWidth - margin_x) / width);
    this.board = new this.Board(width, width);
  }
};
