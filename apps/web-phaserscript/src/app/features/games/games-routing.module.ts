import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DoodleJumpComponent,
  ExampleComponent,
  GamesComponent,
  PinballComponent,
  SpaceShooterComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
  },
  {
    path: 'doodle-jump',
    component: DoodleJumpComponent,
  },
  {
    path: 'example',
    component: ExampleComponent,
  },
  {
    path: 'pinball',
    component: PinballComponent,
  },
  {
    path: 'space-shooter',
    component: SpaceShooterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
