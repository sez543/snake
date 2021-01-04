//Data values for the Board component
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
  speed: 130,
  can_turn: true,
};

//Board class
export const Board = function (y, x) {
  var i = 0;
  var j = 0;
  //Dimensions of the grid calculated by the Generate_Board function
  this.y = y;
  this.x = x;
  //Initialization
  this.matrix = new Array(y);
  for (i = 0; i < y; i++) {
    this.matrix[i] = new Array(x);
    for (j = 0; j < x; j++) {
      this.matrix[i][j] = {
        Head: false,
        Body: false,
        Friut: false,
      };
    }
  }
  //The Snake class
  this.Snake = function (y, x) {
    this.head = {
      x: x,
      y: y,
    };
    this.body = [this.head];
  };
  //The snake's initial position is always the center of the board
  var center = {
    y: Math.floor(y / 2),
    x: Math.floor(x / 2),
  };
  this.snake = new this.Snake(center.y, center.x);
  this.h_y = center.y;
  this.h_x = center.x;
  this.matrix[center.y][center.x].Body = true;
  this.matrix[center.y][center.x].Head = true;
  this.empty = [];
  for (i = 0; i < y; i++) {
    for (j = 0; j < x; j++) {
      if (!(i == center.y && j == center.x)) {
        this.empty.push({
          y: i,
          x: j,
        });
      }
    }
  }
};

export const Generate_Board = function () {
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
