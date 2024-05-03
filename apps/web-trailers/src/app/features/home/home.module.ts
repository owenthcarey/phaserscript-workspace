import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HOME_COMPONENTS, HomeComponent } from './components';
import { MatIcon } from '@angular/material/icon';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), MatIcon],
  declarations: [...HOME_COMPONENTS],
  exports: [...HOME_COMPONENTS]
})
export class HomeModule {}
