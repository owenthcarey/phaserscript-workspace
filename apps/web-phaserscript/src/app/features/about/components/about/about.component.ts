import { Component } from '@angular/core';

import { BaseComponent } from '@phaserscript/xplat/core';

@Component({
  selector: 'phaserscript-about',
  templateUrl: 'about.component.html',
})
export class AboutComponent extends BaseComponent {
  constructor() {
    super();
  }
}
