import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { increment } from '../actions/counter.action';

@Injectable()
export class CounterEffects {

  constructor(private actions$: Actions) {}

  logIncrement$ = createEffect(() =>
      this.actions$.pipe(
        ofType(increment),
        tap(() => console.log('Increment action triggered an effect'))
      ),
    { dispatch: false } // Set dispatch to false because we're not dispatching a new action from this effect
  );
}
