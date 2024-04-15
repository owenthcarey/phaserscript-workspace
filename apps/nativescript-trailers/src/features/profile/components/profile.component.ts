import { Component, inject } from '@angular/core';
import { Screen } from '@nativescript/core'

import { BaseComponent } from '@phaserscript/xplat/core';
import { MovieService } from '@phaserscript/xplat/nativescript/core';

@Component({
  moduleId: module.id,
  selector: 'phaserscript-home',
  templateUrl: './profile.component.html'
})
export class ProfileComponent extends BaseComponent {
  cellsPerRow = 2;
  cellHeight: number;
  movieService = inject(MovieService);
  movies: any[] = [];

  constructor() {
    super();
    this.cellHeight = (4/3) * Screen.mainScreen.widthDIPs / this.cellsPerRow;
    this.movieService.getUpcomingMovies().subscribe((response: any) => {
      this.movies = response.results;
      console.log(this.movies);
    });
  }
}
