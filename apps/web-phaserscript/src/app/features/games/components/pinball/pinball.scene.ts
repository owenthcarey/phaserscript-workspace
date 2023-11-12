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

    const bumperPositions = [
      { x: viewportWidth * 0.25, y: viewportHeight * 0.15 },
      { x: viewportWidth * 0.75, y: viewportHeight * 0.15 },
      { x: viewportWidth * 0.5, y: viewportHeight * 0.25 },
    ];
    bumperPositions.forEach((pos) => {
      this.matter.add
        .image(pos.x, pos.y, 'bumper')
        .setScale(scale)
        .setStatic(true);
    });

    const ballStartPosition = {
      x: viewportWidth * 0.5,
      y: viewportHeight * 0.5,
    }; // Adjust to where the ball starts in the image
    this.ball = this.matter.add
      .image(ballStartPosition.x, ballStartPosition.y, 'ball')
      .setScale(scale)
      .setCircle(8)
      .setBounce(1)
      .setFriction(0, 0, 0);

    const wallThickness = 20; // adjust as needed
    // Top wall
    this.matter.add
      .image(viewportWidth / 2, wallThickness / 2, 'wall')
      .setStatic(true)
      .setScale(scale);
    // Bottom wall (if visible in your image)
    this.matter.add
      .image(viewportWidth / 2, viewportHeight - wallThickness / 2, 'wall')
      .setStatic(true)
      .setScale(scale);
    // Left wall
    this.matter.add
      .image(wallThickness / 2, viewportHeight * 0.3, 'wall')
      .setAngle(90)
      .setStatic(true)
      .setScale(scale);
    // Right wall
    this.matter.add
      .image(viewportWidth - wallThickness / 2, viewportHeight * 0.3, 'wall')
      .setAngle(90)
      .setStatic(true)
      .setScale(scale);

    const slingshotPositions = [
      {
        x: viewportWidth * 0.2,
        y: viewportHeight * 0.55,
        flipX: true,
        flipY: false,
      },
      {
        x: viewportWidth * 0.8,
        y: viewportHeight * 0.55,
        flipX: false,
        flipY: false,
      },
      // Add your slingshot positions here, adjust x and y values to match the image
    ];
    slingshotPositions.forEach((pos) => {
      this.matter.add
        .image(pos.x, pos.y, 'slingshot')
        .setScale(scale)
        .setFlip(pos.flipX, pos.flipY)
        .setStatic(true);
    });

    // Assume the bottom of the viewport is where the flippers are located
    const flipperBaseY = viewportHeight * 0.8; // adjust 100 as needed to match the image
    const flipperBaseXLeft = viewportWidth * 0.25; // adjust the multiplier to position correctly
    const flipperBaseXRight = viewportWidth * 0.75; // adjust the multiplier to position correctly
    this.leftFlipper = this.matter.add
      .image(flipperBaseXLeft, flipperBaseY, 'flipper')
      .setScale(scale)
      .setFlip(true, true)
      .setAngle(30);
    this.rightFlipper = this.matter.add
      .image(flipperBaseXRight, flipperBaseY, 'flipper')
      .setScale(scale)
      .setFlip(false, true)
      .setAngle(-30);
    // Assuming the flipper images are centered at their base
    const flipperWidth = this.leftFlipper.width * scale; // Assuming both flippers are the same size
    // Calculate the pivot points. The pivot should be located at the end of the flipper (where it connects to the pinball machine)
    const leftPivotX = flipperBaseXLeft - flipperWidth / 2;
    const rightPivotX = flipperBaseXRight + flipperWidth / 2;
    const pivotY = flipperBaseY; // The Y position is the same for both pivots
    // Create static pivot bodies
    const leftPivot = this.matter.add.rectangle(leftPivotX, pivotY, 5, 5, {
      isStatic: true,
    });
    const rightPivot = this.matter.add.rectangle(rightPivotX, pivotY, 5, 5, {
      isStatic: true,
    });
    // Add the constraints (i.e., the pivot joints) with a pointB offset that matches the flipper's pivot location
    this.matter.add.constraint(
      this.leftFlipper.body as BodyType,
      leftPivot,
      0,
      1,
      {
        pointA: { x: 0, y: 0 },
        pointB: { x: flipperWidth / 2, y: 0 }, // Adjust this offset based on your image
      }
    );
    this.matter.add.constraint(
      this.rightFlipper.body as BodyType,
      rightPivot,
      0,
      1,
      {
        pointA: { x: 0, y: 0 },
        pointB: { x: -flipperWidth / 2, y: 0 }, // Adjust this offset based on your image
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
