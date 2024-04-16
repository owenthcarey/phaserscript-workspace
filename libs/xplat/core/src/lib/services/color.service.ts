import { Injectable } from '@angular/core';
import { Color } from '../models/color.model';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  generateRandomColors(count: number): Color[] {
    let colors: Color[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(new Color(this.getRandomColor()));
    }
    return colors;
  }

  getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
