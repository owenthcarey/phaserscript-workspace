import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent, PinballComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
  },
  {
    path: 'pinball',
    component: PinballComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
