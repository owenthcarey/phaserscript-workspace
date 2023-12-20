import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LEARN_COMPONENTS } from './components';
import { LearnRoutingModule } from './learn-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [SharedModule, LearnRoutingModule, MatCardModule, MatButtonModule],
  declarations: [...LEARN_COMPONENTS],
  exports: [...LEARN_COMPONENTS],
})
export class LearnModule {}
