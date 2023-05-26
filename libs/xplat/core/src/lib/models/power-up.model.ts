import * as Matter from 'matter-js';
import * as p5 from 'p5';

export class PowerUp {
  body: Matter.Body;

  constructor(x: number, y: number, width: number, height: number) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }

  show(p: p5): void {
    p.push();
    p.fill(0, 255, 0);
    p.rect(
      this.body.position.x,
      this.body.position.y,
      this.body.bounds.max.x - this.body.bounds.min.x,
      this.body.bounds.max.y - this.body.bounds.min.y
    );
    p.pop();
  }
}
