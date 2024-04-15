import { Component, inject } from '@angular/core';

import { BaseComponent } from '@phaserscript/xplat/core';
import { MovieService } from '@phaserscript/xplat/nativescript/core';

@Component({
  moduleId: module.id,
  selector: 'phaserscript-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent {
  movieService = inject(MovieService);

  constructor() {
    super();
    this.movieService.getUpcomingMovies().subscribe((response: any) => {
      console.log(response.results);
    });
  }
}
