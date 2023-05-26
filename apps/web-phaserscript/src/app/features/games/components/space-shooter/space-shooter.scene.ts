import * as Phaser from 'phaser';

export class SpaceShooterScene extends Phaser.Scene {
  player?: Phaser.Physics.Arcade.Sprite;
  bullets?: Phaser.Physics.Arcade.Group;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('enemy', 'assets/enemy.png');
  }

  create() {
    this.player = this.physics.add.sprite(400, 550, 'player');
    this.player.setCollideWorldBounds(true);
    this.bullets = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      defaultKey: 'bullet',
      maxSize: 10,
    });
    const enemies = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      defaultKey: 'enemy',
      maxSize: 10,
    });
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(100, 700);
      const y = Phaser.Math.Between(100, 200);
      enemies.create(x, y);
    }
    this.input.keyboard?.on('keydown-SPACE', () => {
      const bullet = this.bullets?.get(this.player?.x, this.player?.y);
      if (bullet && bullet instanceof Phaser.Physics.Arcade.Sprite) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body!.enable = true;
        bullet.body!.velocity.y = -300;
      }
    });

    this.physics.add.collider(this.bullets, enemies, (bullet, enemy) => {
      if (bullet instanceof Phaser.Physics.Arcade.Sprite) {
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.body!.enable = false;
      }

      if (enemy instanceof Phaser.Physics.Arcade.Sprite) {
        enemy.disableBody(true, true);
      }
    });
  }

  override update() {
    const cursors = this.input.keyboard?.createCursorKeys();
    if (cursors?.left.isDown) {
      this.player?.setVelocityX(-200);
    } else if (cursors?.right.isDown) {
      this.player?.setVelocityX(200);
    } else {
      this.player?.setVelocityX(0);
    }
    this.bullets?.children.iterate((child) => {
      if (child instanceof Phaser.Physics.Arcade.Sprite) {
        const bullet = child;
        if (bullet.y < 0) {
          bullet.setActive(false);
          bullet.setVisible(false);
          bullet.body!.enable = false;
        }
      }
      return true; // indicate to continue iteration
    });
  }
}
