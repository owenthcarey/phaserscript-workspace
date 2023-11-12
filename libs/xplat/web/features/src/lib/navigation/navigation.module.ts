import { NgModule } from '@angular/core';
import { NavigationModule as SharedNavigationModule } from '@phaserscript/xplat/features';
import { UIModule } from '../ui';
import { NAVIGATION_COMPONENTS } from './components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [
    SharedNavigationModule,
    UIModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  declarations: [...NAVIGATION_COMPONENTS],
  exports: [...NAVIGATION_COMPONENTS],
})
export class NavigationModule {}
