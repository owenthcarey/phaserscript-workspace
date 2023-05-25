import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GAMES_COMPONENTS } from './components';
import { GamesRoutingModule } from './games-routing.module';

@NgModule({
  imports: [SharedModule, GamesRoutingModule],
  declarations: [...GAMES_COMPONENTS],
  exports: [...GAMES_COMPONENTS],
})
export class GamesModule {}
