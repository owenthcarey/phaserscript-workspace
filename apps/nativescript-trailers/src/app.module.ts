// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import {
  NativeScriptMaterialBottomNavigationModule
} from '@nativescript-community/ui-material-bottom-navigation/angular';

@NgModule({
  imports: [CoreModule, SharedModule, AppRoutingModule, NativeScriptMaterialBottomNavigationModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
