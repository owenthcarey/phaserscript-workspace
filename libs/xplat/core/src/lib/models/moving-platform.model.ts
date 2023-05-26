import * as Matter from 'matter-js';
import { Platform } from './platform.model';

export class MovingPlatform extends Platform {
  private readonly speed: number;
  private direction = 1;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number
  ) {
    super(x, y, width, height);
    this.speed = speed;
    Matter.Body.setVelocity(this.body, { x: speed, y: 0 }); // Set the platform's initial velocity to move horizontally
  }

  move(): void {
    // Check if the platform has reached the canvas edge
    if (this.body.position.x >= 480 || this.body.position.x <= 0) {
      this.direction *= -1;
    }
    Matter.Body.translate(this.body, { x: this.speed * this.direction, y: 0 });
  }
}
