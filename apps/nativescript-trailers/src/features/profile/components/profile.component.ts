import { Component } from '@angular/core';
import { Screen } from '@nativescript/core'

import { BaseComponent, Color, ColorService } from '@phaserscript/xplat/core';

@Component({
  moduleId: module.id,
  selector: 'phaserscript-home',
  templateUrl: './profile.component.html'
})
export class ProfileComponent extends BaseComponent {
  cellSize: number;
  cellsPerRow = 3;
  colors: Color[];
  headerHeight: number;

  constructor(private colorService: ColorService) {
    super();
    this.colors = this.colorService.generateRandomColors(50);
    this.cellSize = Screen.mainScreen.widthDIPs / this.cellsPerRow;
    this.headerHeight = (Screen.mainScreen.widthDIPs * 2) / this.cellsPerRow;
  }

  templateSelector = (item: Color, index: number, items: Color[]): string => {
    return index === 0 ? 'header' : 'item';
  };

  spanSize = (item: Color, index: number, items: Color[]): number => {
    return index === 0 ? this.cellsPerRow : 1;
  };
}
