export const Spawn_Fruit = function() {
  var fruit = this.board.empty[
    Math.floor(Math.random() * this.board.empty.length)
  ];
  this.board.matrix[fruit.y][fruit.x].Fruit = true;
  this.board.empty = this.board.empty.filter(function(val) {
    return val.y != fruit.y || val.x != fruit.x;
  });
};

export const Start = async function() {
  this.Generate_Board();
  this.d = "right";
  this.is_running = true;
  this.score = 0;
  var x = this.board.h_x;
  var y = this.board.h_y;
  for (var i = 0; i < this.apples; i++) {
    this.Spawn_Fruit();
  }
  this.direction = this.right;
  while (this.is_running) {
    var next = {
      x: x + this.direction.x,
      y: y + this.direction.y,
    };
    if (
      next.y == this.board.y ||
      next.y < 0 ||
      next.x == this.board.x ||
      next.x < 0
    ) {
      if (!this.pacifist) {
        break;
      } else {
        if (next.y == this.board.y) {
          next.y = 0;
        }
        if (next.y < 0) {
          next.y = this.board.y - 1;
        }
        if (next.x == this.board.x) {
          next.x = 0;
        }
        if (next.x < 0) {
          next.x = this.board.x - 1;
        }
      }
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

    y = next.y;
    x = next.x;
    await new Promise((y) => setTimeout(y, this.speed));
    this.can_turn = true;
  }
};
