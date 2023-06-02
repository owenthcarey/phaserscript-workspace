import * as Phaser from 'phaser';
import { BodyType } from 'matter';

export class PinballScene extends Phaser.Scene {
  ball?: Phaser.Physics.Matter.Image;
  leftFlipper?: Phaser.Physics.Matter.Image;
  rightFlipper?: Phaser.Physics.Matter.Image;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'PinballScene' });
  }

  preload() {
    this.load.image('ball', 'assets/pinball/ball.png');
    this.load.image('flipper', 'assets/pinball/flipper.png');
    this.load.image('bumper', 'assets/pinball/bumper.png');
    this.load.image('slingshot', 'assets/pinball/slingshot.png');
    this.load.image('square', 'assets/pinball/square.png');
    this.load.image('wall', 'assets/pinball/wall.png');
  }

  create() {
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;

    // Calculate the size of the camera viewport based on a 9:16 ratio
    let viewportWidth = gameHeight * (9 / 16);
    let viewportHeight = gameHeight;

    // If the game width is less than the calculated viewport width,
    // adjust the viewport width and height based on a 16:9 ratio instead
    if (gameWidth < viewportWidth) {
      viewportWidth = gameWidth;
      viewportHeight = gameWidth * (16 / 9);
    }

    // Set the bounds of the world
    this.matter.world.setBounds(0, 0, viewportWidth, viewportHeight);

    // Set the camera viewport and center the viewport within the game area
    this.cameras.main.setViewport(
      (gameWidth - viewportWidth) / 2,
      (gameHeight - viewportHeight) / 2,
      viewportWidth,
      viewportHeight
    );

    const DESIGN_WIDTH = 900; // Original design width of your game
    const DESIGN_HEIGHT = 1600; // Original design height of your game
    const scaleX = viewportWidth / DESIGN_WIDTH;
    const scaleY = viewportHeight / DESIGN_HEIGHT;
    const scale = Math.min(scaleX, scaleY);

    // this.matter.add.image(200, 300, 'slingshot').setStatic(true).setAngle(180); // Slingshot at the center-top
    // this.matter.add.image(600, 300, 'slingshot').setStatic(true); // Slingshot at the center-top
    // this.matter.add.image(200, 500, 'bumper').setStatic(true); // Bumper on the left
    // this.matter.add.image(600, 500, 'bumper').setStatic(true); // Bumper on the right

    // Top wall
    // this.matter.add
    //   .image(this.cameras.main.width / 2, 100, 'wall')
    //   .setStatic(true);

    // Bottom wall
    // this.matter.add
    //   .image(
    //     this.cameras.main.width / 2,
    //     this.cameras.main.height - 100,
    //     'wall'
    //   )
    //   .setStatic(true);

    // Left wall, rotated 90 degrees
    // this.matter.add
    //   .image(100, this.cameras.main.height / 2, 'wall')
    //   .setAngle(90)
    //   .setStatic(true);

    // Right wall, rotated 90 degrees
    // this.matter.add
    //   .image(
    //     this.cameras.main.width - 100,
    //     this.cameras.main.height / 2,
    //     'wall'
    //   )
    //   .setAngle(90)
    //   .setStatic(true);

    this.ball = this.matter.add
      .image(250 * scale, 500 * scale, 'ball')
      .setScale(scale)
      .setBounce(1)
      .setCircle(8)
      .setFriction(0, 0, 0);

    this.leftFlipper = this.matter.add
      .image(200 * scale, 700 * scale, 'flipper')
      .setScale(scale)
      .setFlip(true, true)
      .setAngle(30);
    this.rightFlipper = this.matter.add
      .image(600 * scale, 700 * scale, 'flipper')
      .setScale(scale)
      .setFlip(false, true)
      .setAngle(-30);

    // Create static pivot bodies
    const leftPivot = this.matter.add.rectangle(
      (200 - this.leftFlipper.width / 2) * scale,
      700 * scale,
      0,
      0,
      {
        isStatic: true,
      }
    );
    const rightPivot = this.matter.add.rectangle(
      (600 + this.rightFlipper.width / 2) * scale,
      700 * scale,
      0,
      0,
      {
        isStatic: true,
      }
    );

    // Add the constraints (i.e., the pivot joints)
    this.matter.add.constraint(
      this.leftFlipper.body as BodyType,
      leftPivot,
      0,
      1,
      {
        pointA: {
          x: (-this.leftFlipper.width / 2) * scale,
          y: -this.leftFlipper.height * scale,
        },
        pointB: { x: 0, y: 0 },
      }
    );
    this.matter.add.constraint(
      this.rightFlipper.body as BodyType,
      rightPivot,
      0,
      1,
      {
        pointA: {
          x: (this.rightFlipper.width / 2) * scale,
          y: -this.rightFlipper.height * scale,
        },
        pointB: { x: 0, y: 0 },
      }
    );

    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  override update() {
    const angularSpeed = 0.1; // This controls the speed of the flipper rotation
    if (this.cursors?.left.isDown) {
      // Allow rotation only if angle is within the limit
      if ((this.leftFlipper?.body as BodyType).angle > -Math.PI / 2) {
        this.leftFlipper?.setAngularVelocity(-angularSpeed);
      } else {
        this.leftFlipper?.setAngularVelocity(0);
      }
    } else {
      // Allow rotation only if angle is within the limit
      if ((this.leftFlipper?.body as BodyType).angle < 0) {
        this.leftFlipper?.setAngularVelocity(angularSpeed);
      } else {
        this.leftFlipper?.setAngularVelocity(0);
      }
    }
    if (this.cursors?.right.isDown) {
      // Allow rotation only if angle is within the limit
      if ((this.rightFlipper?.body as BodyType).angle < Math.PI / 2) {
        this.rightFlipper?.setAngularVelocity(angularSpeed);
      } else {
        this.rightFlipper?.setAngularVelocity(0);
      }
    } else {
      // Allow rotation only if angle is within the limit
      if ((this.rightFlipper?.body as BodyType).angle > 0) {
        this.rightFlipper?.setAngularVelocity(-angularSpeed);
      } else {
        this.rightFlipper?.setAngularVelocity(0);
      }
    }
    if (this.ball!.y > this.cameras.main.height) {
      this.ball?.setPosition(400, 500);
      this.ball?.setVelocity(0);
    }
  }
}
