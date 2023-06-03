import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ABOUT_COMPONENTS } from './components';
import { AboutRoutingModule } from './about-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    SharedModule,
    AboutRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [...ABOUT_COMPONENTS],
  exports: [...ABOUT_COMPONENTS],
})
export class AboutModule {}
