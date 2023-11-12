import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PinballScene } from './pinball.scene';
import Phaser from 'phaser';

import { BaseComponent } from '@phaserscript/xplat/core';

@Component({
  selector: 'phaserscript-pinball',
  templateUrl: 'pinball.component.html',
})
export class PinballComponent
  extends BaseComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @ViewChild('gameContainer') gameContainer?: ElementRef;
  phaserGame?: Phaser.Game;
  config?: Phaser.Types.Core.GameConfig;

  ngOnInit() {
    this.config = {
      type: Phaser.AUTO,
      // height: 800,
      // width: 600,
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
      autoRound: false, // prevent rounding of pixels, which can cause display issues
    };
    // this.phaserGame = new Phaser.Game(this.config);
  }

  ngAfterViewInit() {
    if (this.gameContainer) {
      this.config!.width = this.gameContainer.nativeElement.clientWidth;
      this.config!.height = this.gameContainer.nativeElement.clientHeight;
      // Create the Phaser game after getting the actual game container's dimensions
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
