import { Component, OnDestroy, OnInit } from '@angular/core';
import { PinballScene } from './pinball.scene';
import Phaser from 'phaser';

import { BaseComponent } from '@phaserscript-workspace/xplat/core';

@Component({
  selector: 'phaserscript-workspace-pinball',
  templateUrl: 'pinball.component.html',
})
export class PinballComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  phaserGame?: Phaser.Game;
  config?: Phaser.Types.Core.GameConfig;

  ngOnInit() {
    this.config = {
      type: Phaser.AUTO,
      height: 800,
      width: 600,
      scene: [PinballScene],
      parent: 'gameContainer',
      physics: {
        default: 'matter',
        matter: {
          debug: true,
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
