import { Component } from '@angular/core';

import { BaseComponent } from '@phaserscript/xplat/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  moduleId: module.id,
  selector: 'phaserscript-home-detail',
  templateUrl: './home-detail.component.html'
})
export class HomeDetailComponent extends BaseComponent {
  movieData: any;

  constructor(private routerExtensions: RouterExtensions) {
    super();
    // Retrieve the passed movie data from navigation extras
    const navigation = this.routerExtensions.router.getCurrentNavigation();
    if (navigation?.extras.state.movie) {
      this.movieData = JSON.stringify(navigation.extras.state.movie);
    }
  }
}
