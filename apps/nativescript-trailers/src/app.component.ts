import { Component } from '@angular/core';
import { AppService } from '@phaserscript/xplat/nativescript/core';
import { AppBaseComponent } from '@phaserscript/xplat/nativescript/features';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'phaserscript-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends AppBaseComponent {
  homeTabSetUp = false;
  profileTabSetUp = false;

  constructor(appService: AppService, private routerExtensions: RouterExtensions) {
    super(appService);
  }

  onSelectedIndexChanged(args: any) {
    console.log('onSelectedIndexChanged: ', args.newIndex);
    const selectedIndex = args.newIndex;
    switch (selectedIndex) {
      case 0:
        if (!this.homeTabSetUp) {
          this.routerExtensions.navigate([{ outlets: { homeTab: ['home'] } }]);
          this.homeTabSetUp = true;
        }
        break;
      case 1:
        if (!this.profileTabSetUp) {
          this.routerExtensions.navigate([{ outlets: { profileTab: ['profile'] } }]);
          this.profileTabSetUp = true;
        }
        break;
    }
  }
}
