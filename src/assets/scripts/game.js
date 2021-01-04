export const Spawn_Fruit = function() {
  var fruit = this.board.empty[
    Math.floor(Math.random() * this.board.empty.length)
  ];
  this.board.matrix[fruit.y][fruit.x].Fruit = true;
};

export const Start = async function() {
  this.Generate_Board();
  this.d = "right";
  this.score = 0;
  var x = this.board.h_x;
  var y = this.board.h_y;
  this.Spawn_Fruit();
  this.direction = this.right;
  while (this.constant_true) {
    var next = {
      x: x + this.direction[1],
      y: y + this.direction[0],
    };
    if (
      next.y == this.board.y ||
      next.y < 0 ||
      next.x == this.board.x ||
      next.x < 0
    ) {
      break;
    }
    if (this.board.matrix[next.y][next.x].Body) {
      break;
    }
    if (this.board.matrix[next.y][next.x].Fruit) {
      this.board.matrix[next.y][next.x].Fruit = false;
      this.score++;
      this.Spawn_Fruit();
    } else {
      var tail = this.board.snake.body.shift();
      this.board.empty.push(tail);
      this.board.matrix[tail.y][tail.x].Head = false;
      this.board.matrix[tail.y][tail.x].Body = false;
    }
    this.board.matrix[y][x].Head = false;
    this.board.matrix[next.y][next.x].Head = true;
    this.board.matrix[next.y][next.x].Body = true;
    this.board.snake.body.push(next);
    this.board.empty = this.board.empty.filter(function(val) {
      return val.y != next.y || val.x != next.x;
    });

    y = y + this.direction[0];
    x = x + this.direction[1];
    await new Promise((y) => setTimeout(y, this.speed));
    this.can_turn = true;
  }
};
