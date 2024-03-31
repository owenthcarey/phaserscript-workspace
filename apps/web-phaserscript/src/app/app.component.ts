import { Component } from '@angular/core';

// xplat
import { AppBaseComponent } from '@phaserscript/xplat/web/features';
import { PlatformDetectorService } from '@phaserscript/xplat/core';

@Component({
  selector: 'phaserscript-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends AppBaseComponent {
  constructor(private platformDetectorService: PlatformDetectorService) {
    super();
    if (this.platformDetectorService.isElectron()) {
      // Code specific to Electron
      console.log('Running in Electron.');
    } else {
      // Code specific to Web
      console.log('Running in a Web browser.');
    }
  }
}
