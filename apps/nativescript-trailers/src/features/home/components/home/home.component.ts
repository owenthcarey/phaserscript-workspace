import { Component, inject } from '@angular/core';
import { Screen } from '@nativescript/core'

import { BaseComponent } from '@phaserscript/xplat/core';
import { MovieService } from '@phaserscript/xplat/nativescript/core';
import { ModalDialogService, NativeDialogService, RouterExtensions } from '@nativescript/angular';
import { TestComponent } from '@phaserscript/xplat/nativescript/features';
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
  // modalDialogService = inject(ModalDialogService);
  nativeDialog = inject(NativeDialogService);
  routerExtensions = inject(RouterExtensions);
  movies: any[] = [];

  constructor() {
    super();
    this.cellHeight = (4/3) * Screen.mainScreen.widthDIPs / this.cellsPerRow;
    this.movieService.getUpcomingMovies().subscribe((response: any) => {
      this.movies = response.results;
      console.log(this.movies);
    });
  }

  onItemTap(args: any) {
    const movie = this.movies[args.index];
    console.log("Tapped Movie:", movie);
    const navigationExtras: NavigationExtras = {
      state: {
        movie: movie
      }
    };
    this.routerExtensions.navigate([{ outlets: { homeTab: ['home/detail'] } }], navigationExtras);
    // this.routerExtensions.navigate([{ outlets: { homeTab: ['test'] } }]);
  }

  openModal() {
    // this.modalDialogService.showModal(TestComponent, {
    //   fullscreen: false
    // });
    // https://twitter.com/nativescript/status/1491169244935241729
    const ref = this.nativeDialog.open(TestComponent);
    ref.afterOpened().subscribe(() => console.log('afterOpened'));
    ref.beforeClosed().subscribe((result) => console.log('beforeClosed', result));
    ref.afterClosed().subscribe((result) => console.log('afterClosed', result));
  }
}
