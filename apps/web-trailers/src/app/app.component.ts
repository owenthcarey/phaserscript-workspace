import { Component } from '@angular/core';

// xplat
import { AppBaseComponent } from '@phaserscript/xplat/web/features';

@Component({
  selector: 'phaserscript-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends AppBaseComponent {
  navigationComponentRoutes = [
    { name: 'Home', path: '/home' },
    { name: 'Profile', path: '/profile' },
  ];

  constructor() {
    super();
  }
}
