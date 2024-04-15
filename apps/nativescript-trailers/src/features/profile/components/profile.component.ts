import { Component, inject } from '@angular/core';
import { Screen } from '@nativescript/core'

import { BaseComponent } from '@phaserscript/xplat/core';
import { MovieService } from '@phaserscript/xplat/nativescript/core';

@Component({
  moduleId: module.id,
  selector: 'phaserscript-home',
  templateUrl: './profile.component.html'
})
export class ProfileComponent extends BaseComponent {
}
