import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as Matter from 'matter-js';
import * as p5 from 'p5';

import {
  BaseComponent,
  Doodle,
  MovingPlatform,
  Platform,
  PowerUp,
} from '@phaserscript/xplat/core';

@Component({
  selector: 'phaserscript-doodle-jump',
  templateUrl: 'doodle-jump.component.html',
  styleUrls: ['doodle-jump.component.scss'],
})
export class DoodleJumpComponent
  extends BaseComponent
  implements AfterViewInit
{
  @ViewChild('gameCanvas', { static: true })
  private readonly gameCanvas!: ElementRef;
  private doodle?: Doodle;
  private readonly engine = Matter.Engine.create();
  private onPlatform = false;
  private p5Instance?: p5;
  private readonly platforms: Platform[] = [];
  private readonly powerUps: PowerUp[] = [];
  private powerUpActive = false;
  private score = 0;

  /**
   * Initializes the game canvas when the view is initialized.
   */
  ngAfterViewInit(): void {
    this.createCanvas();
  }

  /**
   * Creates the game canvas and initializes p5.js with setup and draw functions.
   */
  private createCanvas(): void {
    this.p5Instance = new p5((p: p5) => {
      p.setup = () => {
        p.createCanvas(480, 800);
        this.setupPhysics(p);
      };
      p.draw = () => {
        this.handleKeyPress(p);
        this.handleDoodleJump(p);
        Matter.Engine.update(this.engine, 1000 / 60);
        p.background(220);
        this.checkDoodlePosition(p);
        this.drawGameObjects(p);
        this.displayScore(p);
        this.checkGameOver(p);
      };
    }, this.gameCanvas.nativeElement);
  }

  /**
   * Sets up the physics engine, collision handling, and initial game objects.
   * @param {p5} p - The p5.js instance.
   */
  private setupPhysics(p: p5): void {
    const world = this.engine.world;
    this.handleCollisions(this.engine);
    this.doodle = new Doodle(240, 600, 50, 50);
    Matter.World.add(world, this.doodle.body);
    for (let i = 0; i < 10; i++) {
      const platformX = Math.random() * 480;
      const platformY = i * 80;
      const platformWidth = 80;
      const platformHeight = 20;

      // Create moving platforms for every 3rd platform
      if (i % 3 === 0) {
        const speed = Math.random() * 2 + 1;
        const movingPlatform = new MovingPlatform(
          platformX,
          platformY,
          platformWidth,
          platformHeight,
          speed
        );
        this.platforms.push(movingPlatform);
        Matter.World.add(world, movingPlatform.body);
      } else {
        const platform = new Platform(
          platformX,
          platformY,
          platformWidth,
          platformHeight
        );
        this.platforms.push(platform);
        Matter.World.add(world, platform.body);
      }
    }
    for (let i = 0; i < 5; i++) {
      const powerUpX = Math.random() * 480;
      const powerUpY = i * 160;
      const powerUpWidth = 20;
      const powerUpHeight = 20;
      const powerUp = new PowerUp(
        powerUpX,
        powerUpY,
        powerUpWidth,
        powerUpHeight
      );
      // Check if the power-up is overlapping any platform
      let overlapping = false;
      this.platforms.forEach((platform) => {
        const distance = Matter.Vector.magnitude(
          Matter.Vector.sub(platform.body.position, powerUp.body.position)
        );
        if (
          distance <
          (powerUpWidth +
            platform.body.bounds.max.x -
            platform.body.bounds.min.x) /
            2
        ) {
          overlapping = true;
        }
      });
      // If not overlapping, add the power-up to the world and the powerUps array
      if (!overlapping) {
        this.powerUps.push(powerUp);
        Matter.World.add(world, powerUp.body);
      }
    }
  }

  /**
   * Handles the left and right arrow key presses to move the doodle.
   * @param {p5} p - The p5.js instance.
   */
  private handleKeyPress(p: p5): void {
    const screenWidth = p.width;
    if (p.keyIsDown(p.LEFT_ARROW)) {
      this.doodle?.move('left');
    } else if (p.keyIsDown(p.RIGHT_ARROW)) {
      this.doodle?.move('right');
    } else {
      Matter.Body.setVelocity(this.doodle!.body, {
        x: 0,
        y: this.doodle!.body.velocity.y,
      });
    }
    // Wraparound movement
    if (this.doodle!.body.position.x < 0) {
      Matter.Body.setPosition(this.doodle!.body, {
        x: screenWidth,
        y: this.doodle!.body.position.y,
      });
    } else if (this.doodle!.body.position.x > screenWidth) {
      Matter.Body.setPosition(this.doodle!.body, {
        x: 0,
        y: this.doodle!.body.position.y,
      });
    }
  }

  /**
   * Handles the up arrow key press to make the doodle jump.
   * @param {p5} p - The p5.js instance.
   */
  private handleDoodleJump(p: p5): void {
    if (p.keyIsDown(p.UP_ARROW) && this.onPlatform) {
      const jumpForce = this.powerUpActive ? -0.25 : -0.15;
      // const jumpForce = -0.15;
      Matter.Body.setVelocity(this.doodle!.body, {
        x: this.doodle!.body.velocity.x,
        y: 0,
      });
      Matter.Body.applyForce(this.doodle!.body, this.doodle!.body.position, {
        x: 0,
        y: jumpForce,
      });
    }
  }

  /**
   * Checks the doodle's position and translates platforms and doodle accordingly.
   * @param {p5} p - The p5.js instance.
   */
  private checkDoodlePosition(p: p5): void {
    if (this.doodle!.body.position.y < p.height / 2) {
      this.platforms.forEach((platform) => {
        Matter.Body.translate(platform.body, { x: 0, y: 5 });
        if (platform.body.position.y > p.height) {
          Matter.Body.setPosition(platform.body, {
            x: Math.random() * p.width,
            y: platform.body.position.y - p.height,
          });
        }
      });
      // Add this block to reposition the PowerUps
      this.powerUps.forEach((powerUp) => {
        Matter.Body.translate(powerUp.body, { x: 0, y: 5 });
        if (powerUp.body.position.y > p.height) {
          Matter.Body.setPosition(powerUp.body, {
            x: Math.random() * p.width,
            y: powerUp.body.position.y - p.height,
          });
        }
      });
      Matter.Body.translate(this.doodle!.body, { x: 0, y: 5 });
      this.score += 5;
    }
  }

  /**
   * Draws the game objects (doodle and platforms) on the canvas.
   * @param {p5} p - The p5.js instance.
   */
  private drawGameObjects(p: p5): void {
    this.doodle?.show(p);
    this.platforms.forEach((platform) => {
      platform.show(p);
      if (platform instanceof MovingPlatform) {
        platform.move();
      }
    });
    this.powerUps.forEach((powerUp) => {
      powerUp.show(p);
    });
  }

  /**
   * Displays the current score on the canvas.
   * @param {p5} p - The p5.js instance.
   */
  private displayScore(p: p5): void {
    p.fill(0);
    p.textSize(32);
    p.text(`Score: ${this.score}`, 10, 40);
  }

  /**
   * Checks for game over and displays a message if the game is over.
   * @param {p5} p - The p5.js instance.
   */
  private checkGameOver(p: p5): void {
    if (this.doodle!.body.position.y > p.height) {
      p.fill(0);
      p.textSize(64);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Game Over', p.width / 2, p.height / 2);
      p.noLoop();
    }
  }

  /**
   * Handles collision events between the doodle and platforms, updating the onPlatform state.
   * @param {Matter.Engine} engine - The Matter.js engine.
   */
  private handleCollisions(engine: Matter.Engine): void {
    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        if (
          (bodyA === this.doodle?.body &&
            this.platforms.some((platform) => platform.body === bodyB)) ||
          (bodyB === this.doodle?.body &&
            this.platforms.some((platform) => platform.body === bodyA))
        ) {
          this.onPlatform = true;
        }
        if (
          (bodyA === this.doodle?.body &&
            this.powerUps.some((powerUp) => powerUp.body === bodyB)) ||
          (bodyB === this.doodle?.body &&
            this.powerUps.some((powerUp) => powerUp.body === bodyA))
        ) {
          this.activatePowerUp();
          // Remove the power-up from the world and the powerUps array
          const collidedPowerUp = this.powerUps.find(
            (powerUp) => powerUp.body === bodyA || powerUp.body === bodyB
          );
          if (collidedPowerUp) {
            Matter.World.remove(engine.world, collidedPowerUp.body);
            this.powerUps.splice(this.powerUps.indexOf(collidedPowerUp), 1);
          }
        }
      });
    });
    Matter.Events.on(engine, 'collisionEnd', (event) => {
      event.pairs.forEach((pair) => {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        if (
          (bodyA === this.doodle?.body &&
            this.platforms.some((platform) => platform.body === bodyB)) ||
          (bodyB === this.doodle?.body &&
            this.platforms.some((platform) => platform.body === bodyA))
        ) {
          this.onPlatform = false;
        }
      });
    });
  }

  private activatePowerUp(): void {
    this.powerUpActive = true;
    setTimeout(() => {
      this.powerUpActive = false;
    }, 5000); // The effect lasts for 5 seconds
  }
}
