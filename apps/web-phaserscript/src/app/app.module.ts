import { NgModule } from '@angular/core';

// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NavigationModule } from '@phaserscript/xplat/web/features';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './core/store/reducers/counter.reducer';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavigationModule,
    StoreModule.forRoot({ count: counterReducer }, {}),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
