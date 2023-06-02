import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ABOUT_COMPONENTS } from './components';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  imports: [SharedModule, AboutRoutingModule],
  declarations: [...ABOUT_COMPONENTS],
  exports: [...ABOUT_COMPONENTS],
})
export class AboutModule {}
