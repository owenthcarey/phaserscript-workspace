import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ExampleScene } from './example.scene';
import Phaser from 'phaser';

import { BaseComponent } from '@phaserscript/xplat/core';

@Component({
  selector: 'phaserscript-example',
  templateUrl: 'example.component.html',
  styleUrls: ['example.component.scss'],
})
export class ExampleComponent
  extends BaseComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild('gameContainer') gameContainer?: ElementRef;
  phaserGame?: Phaser.Game;
  config?: Phaser.Types.Core.GameConfig;

  ngAfterViewInit() {
    if (this.gameContainer) {
      this.config = {
        type: Phaser.AUTO,
        height: 600,
        width: 800,
        scene: [ExampleScene],
        parent: 'gameContainer',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 300 },
            debug: true,
          },
        },
      };
      this.phaserGame = new Phaser.Game(this.config);
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.phaserGame?.destroy(true);
  }
}
