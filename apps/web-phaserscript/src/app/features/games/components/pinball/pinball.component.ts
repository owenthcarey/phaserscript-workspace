import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { PinballScene } from './pinball.scene';
import Phaser from 'phaser';

import { BaseComponent } from '@phaserscript/xplat/core';

@Component({
  selector: 'phaserscript-pinball',
  templateUrl: 'pinball.component.html',
  styleUrls: ['pinball.component.scss'],
})
export class PinballComponent
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
        height: this.gameContainer.nativeElement.clientHeight,
        width: this.gameContainer.nativeElement.clientWidth,
        scene: [PinballScene],
        parent: 'gameContainer',
        physics: {
          default: 'matter',
          matter: {
            debug: true,
          },
        },
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        autoRound: false, // Prevent rounding of pixels
      };
      // Create the Phaser game after getting the game container's dimensions
      this.phaserGame = new Phaser.Game(this.config);
      window.addEventListener('resize', this.resizeGame);
    }
  }

  resizeGame = () => {
    if (this.gameContainer && this.phaserGame) {
      this.phaserGame.scale.resize(
        this.gameContainer.nativeElement.clientWidth,
        this.gameContainer.nativeElement.clientHeight
      );
    }
  };

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.phaserGame?.destroy(true);
    window.removeEventListener('resize', this.resizeGame);
  }
}
