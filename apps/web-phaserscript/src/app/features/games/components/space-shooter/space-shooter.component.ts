import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpaceShooterScene } from './space-shooter.scene';
import Phaser from 'phaser';

import { BaseComponent } from '@phaserscript/xplat/core';

@Component({
  selector: 'phaserscript-space-shooter',
  templateUrl: 'space-shooter.component.html',
  styleUrls: ['space-shooter.component.scss'],
})
export class SpaceShooterComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  phaserGame?: Phaser.Game;
  config?: Phaser.Types.Core.GameConfig;

  ngOnInit() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [SpaceShooterScene],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    };
    this.phaserGame = new Phaser.Game(this.config);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.phaserGame?.destroy(true);
  }
}
