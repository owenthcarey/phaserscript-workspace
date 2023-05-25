import { Component } from '@angular/core';

// xplat
import { AppBaseComponent } from '@phaserscript-workspace/xplat/web/features';

@Component({
  selector: 'phaserscript-workspace-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends AppBaseComponent {
  constructor() {
    super();
  }
}
