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
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './core/store/effects/counter.effects';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavigationModule,
    StoreModule.forRoot({ counter: counterReducer }, {}),
    EffectsModule.forRoot([CounterEffects]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
