import { Component } from '@angular/core';
import { AppService } from '@phaserscript/xplat/nativescript/core';
import { AppBaseComponent } from '@phaserscript/xplat/nativescript/features';

@Component({
  selector: 'phaserscript-root',
  template: `
    <GridLayout>
      <page-router-outlet></page-router-outlet>
    </GridLayout>
  `
})
export class AppComponent extends AppBaseComponent {
  constructor(appService: AppService) {
    super(appService);
  }
}
