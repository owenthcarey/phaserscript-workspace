import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { SharedModule } from '../shared/shared.module';
import { PROFILE_COMPONENTS, ProfileComponent } from './components';
import { CollectionViewModule } from '@nativescript-community/ui-collectionview/angular';
import { NativeScriptMaterialButtonModule } from '@nativescript-community/ui-material-button/angular';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [CollectionViewModule, SharedModule, NativeScriptRouterModule.forChild(routes), NativeScriptMaterialButtonModule],
  declarations: [...PROFILE_COMPONENTS],
  exports: [...PROFILE_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule {}
