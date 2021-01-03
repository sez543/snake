export const Spawn_Fruit = function() {
  var x = Math.floor(Math.random() * this.board.x);
  var y = Math.floor(Math.random() * this.board.y);
  this.board.matrix[y][x].Fruit = true;
  this.board.matrix[y][x].Empty = false;
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
      this.board.snake.size++;
      this.score++;
      this.Spawn_Fruit();
    } else {
      var tail = this.board.snake.body.shift();
      this.board.matrix[tail[0]][tail[1]].Head = false;
      this.board.matrix[tail[0]][tail[1]].Body = false;
      this.board.matrix[tail[0]][tail[1]].Empty = true;
    }
    this.board.matrix[y][x].Head = false;
    this.board.matrix[next.y][next.x].Head = true;
    this.board.matrix[next.y][next.x].Body = true;
    this.board.matrix[next.y][next.x].Empty = false;
    this.board.snake.body.push([next.y, next.x]);
    y = y + this.direction[0];
    x = x + this.direction[1];
    await new Promise((y) => setTimeout(y, this.speed));
    this.can_turn = true;
  }
};
