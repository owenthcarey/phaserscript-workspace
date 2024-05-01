import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { Routes } from '@angular/router';
import { NativeDialogService, NativeScriptRouterModule } from '@nativescript/angular';

import { SharedModule } from '../shared/shared.module';
import { HOME_COMPONENTS, HomeComponent, HomeDetailComponent } from './components';
import { CollectionViewModule } from '@nativescript-community/ui-collectionview/angular';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'detail',
    component: HomeDetailComponent,
  },
];

@NgModule({
  imports: [CollectionViewModule, SharedModule, NativeScriptRouterModule.forChild(routes)],
  declarations: [...HOME_COMPONENTS],
  exports: [...HOME_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [NativeDialogService]
})
export class HomeModule {}
