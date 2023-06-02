import { Component } from '@angular/core';

import { BaseComponent } from '@phaserscript-workspace/xplat/core';

@Component({
  selector: 'phaserscript-workspace-about',
  templateUrl: 'about.component.html',
})
export class AboutComponent extends BaseComponent {
  constructor() {
    super();
  }
}
