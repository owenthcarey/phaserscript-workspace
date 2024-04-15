import { Component, inject } from '@angular/core';
import { Screen } from '@nativescript/core'

import { BaseComponent } from '@phaserscript/xplat/core';
import { MovieService } from '@phaserscript/xplat/nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'phaserscript-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent {
  cellsPerRow = 2;
  cellHeight: number;
  movieService = inject(MovieService);
  movies: any[] = [];

  constructor(private routerExtensions: RouterExtensions) {
    super();
    this.cellHeight = (4/3) * Screen.mainScreen.widthDIPs / this.cellsPerRow;
    this.movieService.getUpcomingMovies().subscribe((response: any) => {
      this.movies = response.results;
      console.log(this.movies);
    });
  }

  onMovieTap(args: any) {
    const movie = this.movies[args.index];
    console.log("Tapped Movie:", movie);
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     movie: movie
    //   }
    // };
    // this.routerExtensions.navigate(['home/detail'], navigationExtras);
    // this.routerExtensions.navigate([{ outlets: { homeTab: ['home/detail'] } }]);
    // this.routerExtensions.navigate([{ outlets: { homeTab: ['home', 'detail'] } }]);
    this.routerExtensions.navigate([{ outlets: { homeTab: ['test'] } }]);
  }
}
