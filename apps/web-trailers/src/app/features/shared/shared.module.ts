import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@phaserscript/xplat/web/features';

const MODULES = [UIModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class SharedModule {}
