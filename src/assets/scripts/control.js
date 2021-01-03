export const Change_Direction = function(key) {
  if (this.can_turn) {
    switch (key) {
      case 37: //Left
      case 65:
        if (this.direction != this.right) {
          this.direction = this.left;
          this.d = "left";
        }
        break;
      case 38: //Up
      case 87:
        if (this.direction != this.down) {
          this.direction = this.up;
          this.d = "up";
        }
        break;
      case 39: //Right
      case 68:
        if (this.direction != this.left) {
          this.direction = this.right;
          this.d = "right";
        }
        break;
      case 40: //Down
      case 83:
        if (this.direction != this.up) {
          this.direction = this.down;
          this.d = "down";
        }
        break;
    }
    this.can_turn = false;
  }
};
