import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

import { TestBaseComponent } from '@phaserscript/xplat/features';

@Component({
  moduleId: module.id,
  selector: 'phaserscript-test',
  templateUrl: 'test.component.html'
})
export class TestComponent extends TestBaseComponent {
  constructor(private routerExtensions: RouterExtensions) {
    super();
  }

  goBack() {
    this.routerExtensions.back();
  }
}
