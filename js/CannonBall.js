class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.isSink = false;
    this.r = 30;
    this.speed = 0.05;
    this.trajectory = [];
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    this.animation = [this.image];
    World.add(world, this.body);
  }

  shoot() {
    var newAngle = cannon.angle - 28;
    newAngle = newAngle * (3.14 / 180)
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14)
    });
  }

  display() {
    if (this.body.position.x > 300 && this.body.velocity.x > 0) {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }
    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();
  }

  remove(index) {
    console.log("remove")
    this.isSink = true;
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    this.animation =  waterSplashAnimation ;
    this.speed = 0.05;
    this.r = 30;
    setTimeout(() => {
      Matter.World.remove(world, this.body);
      delete balls[index];
    }, 1000);
  }

  animate() {
    this.speed += 0.05;
  }
}
