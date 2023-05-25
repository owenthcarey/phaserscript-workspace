import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GAMES_COMPONENTS } from './components';
import { GamesRoutingModule } from './games-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [SharedModule, GamesRoutingModule, MatCardModule, MatButtonModule],
  declarations: [...GAMES_COMPONENTS],
  exports: [...GAMES_COMPONENTS],
})
export class GamesModule {}
