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
    this.matter.world.setBounds(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    );
    // this.add.image(400, 500, 'wall'); // Wall at the center
    this.matter.add.image(200, 300, 'slingshot').setStatic(true).setAngle(180); // Slingshot at the center-top
    this.matter.add.image(600, 300, 'slingshot').setStatic(true); // Slingshot at the center-top
    // this.add.image(400, 700, 'square'); // Square at the center-bottom
    this.matter.add.image(200, 500, 'bumper').setStatic(true); // Bumper on the left
    this.matter.add.image(600, 500, 'bumper').setStatic(true); // Bumper on the right

    // Top wall
    this.matter.add
      .image(this.cameras.main.width / 2, 100, 'wall')
      .setStatic(true);

    // Bottom wall
    this.matter.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height - 100,
        'wall'
      )
      .setStatic(true);

    // Left wall, rotated 90 degrees
    this.matter.add
      .image(100, this.cameras.main.height / 2, 'wall')
      .setAngle(90)
      .setStatic(true);

    // Right wall, rotated 90 degrees
    this.matter.add
      .image(
        this.cameras.main.width - 100,
        this.cameras.main.height / 2,
        'wall'
      )
      .setAngle(90)
      .setStatic(true);

    this.ball = this.matter.add.image(400, 500, 'ball');
    this.ball.setCircle(8);
    this.ball.setBounce(1);
    this.ball.setFriction(0, 0, 0);

    this.leftFlipper = this.matter.add.image(300, 700, 'flipper');
    this.rightFlipper = this.matter.add.image(500, 700, 'flipper');
    // Depending on the shape and orientation of your flipper image,
    // you might need to rotate the flippers to position them correctly.
    // For example:
    // this.leftFlipper.setAngle(-30);
    // this.rightFlipper.setAngle(30);

    // Apply constraints to flippers
    // this.matter.add.constraint(
    //   this.leftFlipper.body as BodyType,
    //   this.rightFlipper.body as BodyType,
    //   80,
    //   0.8
    // );
    // this.matter.add.mouseSpring({});

    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  override update() {
    if (this.cursors?.left.isDown) {
      this.leftFlipper?.setAngularVelocity(-0.15);
    } else if (this.cursors?.right.isDown) {
      this.rightFlipper?.setAngularVelocity(0.15);
    } else {
      this.leftFlipper?.setAngularVelocity(0);
      this.rightFlipper?.setAngularVelocity(0);
    }
    if (this.ball!.y > this.cameras.main.height) {
      this.ball?.setPosition(400, 500);
      this.ball?.setVelocity(0);
    }
  }
}
