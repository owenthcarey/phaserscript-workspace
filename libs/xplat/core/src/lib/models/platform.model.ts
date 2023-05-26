import * as Matter from 'matter-js';
import * as p5 from 'p5';

export class Platform {
  public body: Matter.Body;

  public constructor(x: number, y: number, width: number, height: number) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, {isStatic: true});
  }

  public show(p: p5): void {
    const pos = this.body.position;
    p.rectMode(p.CENTER);
    p.fill(139, 69, 19);
    p.rect(
      pos.x,
      pos.y,
      this.body.bounds.max.x - this.body.bounds.min.x,
      this.body.bounds.max.y - this.body.bounds.min.y
    );
  }
}
