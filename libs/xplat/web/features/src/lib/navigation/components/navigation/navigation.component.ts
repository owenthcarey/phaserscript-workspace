import { Component } from '@angular/core';
import { BaseComponent } from '@phaserscript-workspace/xplat/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'phaserscript-workspace-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent extends BaseComponent {
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
