import * as Phaser from 'phaser';

export class PinballScene extends Phaser.Scene {
  ball?: Phaser.Physics.Matter.Image;
  leftFlipper?: Phaser.Physics.Matter.Image;
  rightFlipper?: Phaser.Physics.Matter.Image;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'PinballScene' });
  }

  preload() {
    this.load.image('ball', 'assets/ball.png');
    this.load.image('flipper', 'assets/flipper.png');
    // Load other assets like bumpers and pins
  }

  create() {
    this.matter.world.setBounds(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    );

    this.ball = this.matter.add.image(400, 500, 'ball');
    this.ball.setCircle(8); // Assumes the ball is a perfect circle
    this.ball.setBounce(1);
    this.ball.setFriction(0, 0, 0);

    this.leftFlipper = this.matter.add.image(300, 700, 'flipper');
    this.rightFlipper = this.matter.add.image(500, 700, 'flipper');
    // Add constraints (joints) to the flippers so they can rotate

    // Create and position other elements like bumpers and pins

    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  override update() {
    if (this.cursors?.left.isDown) {
      // Apply a force or torque to leftFlipper
    }
    if (this.cursors?.right.isDown) {
      // Apply a force or torque to rightFlipper
    }
    if (this.cursors?.up.isDown) {
      // Launch the ball if it's not already in play
    }
    if (this.ball!.y > this.cameras.main.height) {
      // Reset the ball if it fell off the bottom
    }
    // Handle other gameplay mechanics like scoring
  }
}
