import * as Phaser from 'phaser';

export class ExampleScene extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private stars?: Phaser.Physics.Arcade.Group;
  private bombs?: Phaser.Physics.Arcade.Group;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private scoreText?: Phaser.GameObjects.Text;
  private score: number = 0;
  private gameOver: boolean = false;

  constructor() {
    super({ key: 'ExampleScene' });
  }

  preload() {
    this.load.image('sky', 'assets/example/sky.png');
    this.load.image('ground', 'assets/example/platform.png');
    this.load.image('star', 'assets/example/star.png');
    this.load.image('bomb', 'assets/example/bomb.png');
    this.load.spritesheet('dude', 'assets/example/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    // The player and its settings
    this.player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    //  Input Events
    this.cursors = this.input.keyboard?.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    // this.stars.children.iterate(function (child) {
    //
    //   //  Give each star a slightly different bounce
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //
    // });

    this.stars.children.iterate((child) => {
      const star = child as Phaser.Physics.Arcade.Image; // Cast to the correct type
      star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      return null; // Return null as required by the iterate method
    });

    this.bombs = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // @ts-ignore
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // @ts-ignore
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

  override update() {
    if (this.gameOver)
    {
      return;
    }

    if (this.cursors?.left.isDown)
    {
      this.player?.setVelocityX(-160);
      this.player?.anims.play('left', true);
    }
    else if (this.cursors?.right.isDown)
    {
      this.player?.setVelocityX(160);
      this.player?.anims.play('right', true);
    }
    else
    {
      this.player?.setVelocityX(0);
      this.player?.anims.play('turn');
    }

    if (this.cursors?.up.isDown && this.player?.body?.touching.down)
    {
      this.player.setVelocityY(-330);
    }
  }

  private collectStar(player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Image) {
    star.disableBody(true, true);
    //  Add and update the score
    this.score += 10;
    this.scoreText?.setText('Score: ' + this.score);
    if (this.stars?.countActive(true) === 0)
    {
      //  A new batch of stars to collect
      // this.stars.children.iterate(function (child) {
      //   child.enableBody(true, child.x, 0, true, true);
      // });
      this.stars.children.iterate((child) => {
        const star = child as Phaser.Physics.Arcade.Image; // Cast to the correct type
        star.enableBody(true, star.x, 0, true, true);
        return null; // Return null as required by the iterate method
      });
      const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      const bomb = this.bombs?.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  private hitBomb(player: Phaser.Physics.Arcade.Sprite, bomb: Phaser.Physics.Arcade.Image) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.gameOver = true;
  }
}
