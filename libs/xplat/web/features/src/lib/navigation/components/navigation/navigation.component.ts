import { Component } from '@angular/core';
import { BaseComponent } from '@phaserscript/xplat/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'phaserscript-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent extends BaseComponent {
  routes = [
    { name: 'Home', path: '/home' },
    { name: 'Games', path: '/games' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    super();
  }
}
